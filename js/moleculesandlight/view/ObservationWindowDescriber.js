// Copyright 2019-2020, University of Colorado Boulder

/**
 * Manages PDOM content that describes the ObservationWindow. This contains a single light source, and a target
 * molecule. This will describe the state of the target molecule as it absorbs and emits photons or breaks
 * apart into constituent molecules.
 *
 * When the photon wavelength or target molecule changes, we describe an initial state where photons
 * are passing through the molecule. As soon as a photon is absorbed, we describe the excited state
 * of the molecule (vibrating/glowing/rotating/etc.). Once the photon is re-emitted, the ground state
 * energy phase is described. The initial state description for photons passing through the molecule is
 * not re-applied until the photon wavelength or target molecule changes again.
 *
 * TODO: accessibleName was replaced throughout with innerContent because of https://github.com/phetsims/scenery/issues/1026
 * If that issue is fixed, accessibleName can be used again
 *
 * @author Jesse Greenberg
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MovementDescriber from '../../../../scenery-phet/js/accessibility/describers/MovementDescriber.js';
import moleculesAndLightStrings from '../../moleculesAndLightStrings.js';
import moleculesAndLight from '../../moleculesAndLight.js';
import PhotonTarget from '../../photon-absorption/model/PhotonTarget.js';
import WavelengthConstants from '../../photon-absorption/model/WavelengthConstants.js';
import ActiveMoleculeAlertManager from './ActiveMoleculeAlertManager.js';
import ObservationWindowAlertManager from './ObservationWindowAlertManager.js';

const emptySpaceString = moleculesAndLightStrings.a11y.emptySpace;
const photonEmitterOffDescriptionPatternString = moleculesAndLightStrings.a11y.photonEmitterOffDescriptionPattern;
const targetMoleculePatternString = moleculesAndLightStrings.a11y.targetMoleculePattern;
const inactiveAndPassesPhaseDescriptionPatternString = moleculesAndLightStrings.a11y.inactiveAndPassesPhaseDescriptionPattern;
const emissionPhaseDescriptionPatternString = moleculesAndLightStrings.a11y.emissionPhaseDescriptionPattern;
const breakApartDescriptionWithHintPatternString = moleculesAndLightStrings.a11y.breakApartDescriptionWithHintPattern;
const resetOrChangeMoleculeString = moleculesAndLightStrings.a11y.resetOrChangeMolecule;

class ObservationWindowDescriber {

  /**
   * @param {PhotonAbsorptionModel} model
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( model, modelViewTransform ) {

    // @private {PhotonAbsorptionModel}
    this.model = model;

    // @private {ModelViewTransform2} - to describe photon emission motion in scenery coordinate frame
    this.modelViewTransform = modelViewTransform;

    // @private {boolean} - state of molecule when we absorb a photon, tracked so that we can accurately describe what
    // stops happening when the photon is re-emitted - the Molecule Properties tracking these things may have already
    // reset upon emission so tracking these explicitly is more robust
    this.moleculeVibrating = false;
    this.moleculeRotating = false;
    this.moleculeRotatingClockwise = false;
    this.moleculeRotatingCounterClockwise = false;
    this.moleculeHighElectronicEnergyState = false;
    this.moleculeBrokeApart = false;

    // @private - responsible for general alerts involving things in the observation window
    this.alertManager = new ObservationWindowAlertManager();
    this.alertManager.initialize( model );

    // @private {ActiveMoleculeAlertManager} - responsible for alerts specifically related to photon/molecule
    // interaction
    this.activeMoleculeAlertManager = new ActiveMoleculeAlertManager( model, modelViewTransform );

    // @private {number} while a photon is absorbed the model photonWavelengthProperty may change - we want
    // to describe the absorbed photon not the photon wavelength currently being emitted
    this.wavelengthOnAbsorption = model.photonWavelengthProperty.get();
  }

  /**
   * Step the alert manater in time.
   * @public
   *
   * @param {number} dt - in seconds
   */
  step( dt ) {
    this.activeMoleculeAlertManager.step( dt );
  }

  /**
   * Attach listeners to this PhotonAbsorptionModel that will set the description content on the provided Node
   * that describes the "initial" phase where photons are passing through the molecule.
   *
   * When the photon wavelength changes or the light source slider turns on or off, we go back to describing
   * the initial phase where photons pass through the molecule. The only exception is when there is no target
   * molecule - in this case we keep the description that guides the user to the 'return molecule' button.
   *
   * @param {Node} descriptionNode
   */
  attachInitialPhaseDescriptionListeners( descriptionNode ) {
    this.model.photonWavelengthProperty.link( photonWavelength => {
      if ( this.model.targetMolecule ) {
        descriptionNode.innerContent = this.getInitialPhaseDescription( this.model.photonEmitterOnProperty.get(), photonWavelength, this.model.photonTargetProperty.get() );
      }
    } );

    // when the molecule turns on or off, reset description content to initial description
    this.model.photonEmitterOnProperty.link( on => {
      if ( this.model.targetMolecule ) {
        descriptionNode.innerContent = this.getInitialPhaseDescription( on, this.model.photonWavelengthProperty.get(), this.model.photonTargetProperty.get() );
      }
    } );
  }

  /**
   * Attach listeners to a Molecule that will update a provided Node's description content. These Properties
   * are fully disposed when the molecule is disposed so listener removal should not be necessary.
   * @public
   *
   * @param {Molecule} molecule
   * @param {Node} descriptionNode
   */
  attachAbsorptionDescriptionListeners( molecule, descriptionNode ) {

    // new target molecule added, reset to initial phase description
    if ( molecule === this.model.targetMolecule ) {
      descriptionNode.innerContent = this.getInitialPhaseDescription( this.model.photonEmitterOnProperty.get(), this.model.photonWavelengthProperty.get(), this.model.photonTargetProperty.get() );
    }

    // vibration
    molecule.currentVibrationRadiansProperty.lazyLink( vibrationRadians => {
      this.moleculeVibrating = molecule.vibratingProperty.get();

      if ( this.moleculeVibrating ) {
        this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
        descriptionNode.innerContent = this.activeMoleculeAlertManager.getVibrationPhaseDescription( vibrationRadians );
      }
    } );

    // rotation
    molecule.rotatingProperty.lazyLink( rotating => {
      this.moleculeRotating = rotating;
      this.moleculeRotatingClockwise = molecule.rotationDirectionClockwiseProperty.get();

      if ( rotating ) {
        this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
        descriptionNode.innerContent = this.activeMoleculeAlertManager.getRotationPhaseDescription();
      }
    } );

    // high electronic energy state (glowing)
    molecule.highElectronicEnergyStateProperty.lazyLink( highEnergy => {
      this.moleculeHighElectronicEnergyState = highEnergy;

      if ( highEnergy ) {
        this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
        descriptionNode.innerContent = this.activeMoleculeAlertManager.getHighElectronicEnergyPhaseDescription();
      }
    } );

    // re-emission
    molecule.photonEmittedEmitter.addListener( photon => {
      descriptionNode.innerContent = this.getEmissionPhaseDescription( photon );
    } );

    // break apart
    molecule.brokeApartEmitter.addListener( ( moleculeA, moleculeB ) => {
      this.moleculeBrokeApart = true;
      this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();

      descriptionNode.innerContent = this.activeMoleculeAlertManager.getBreakApartPhaseDescription( moleculeA, moleculeB );

      const activeMolecules = this.model.activeMolecules;

      // When the constituent molecules are added to the list of active molecules, add a listener that
      // will describe their removal once they are removed - only needs to be added once on the
      // first addition of a constituent molecule. Must be added on molecule addition because they
      // do not exist in activeMolecules at the time of break apart.
      const addMoleculeRemovalListener = () => {
        const describeMoleculesRemoved = ( molecule, observableArray ) => {
          if ( !activeMolecules.contains( moleculeA ) && !activeMolecules.contains( moleculeB ) ) {

            descriptionNode.innerContent = StringUtils.fillIn( breakApartDescriptionWithHintPatternString, {
              description: this.alertManager.getMoleculesFloatingAwayDescription( moleculeA, moleculeB ),
              hint: resetOrChangeMoleculeString
            } );
            activeMolecules.removeItemRemovedListener( describeMoleculesRemoved );
          }
        };

        activeMolecules.addItemRemovedListener( describeMoleculesRemoved );

        // itemRemoved listener has been added, can remove the itemAdded listener immediately
        activeMolecules.removeItemAddedListener( addMoleculeRemovalListener );
      };

      activeMolecules.addItemAddedListener( addMoleculeRemovalListener );
    } );
  }

  /**
   * Get the description of photon/molecule phase for initial interaction. This will be when photons
   * start to emit and are passing through the molecule. Once a photon is absorbed a new description strategy begins
   * where we describe the absorption.
   *
   * @param {boolean} emitterOn
   * @param {number} photonWavelength
   * @param {PhotonTarget} photonTarget
   * @returns {string}
   */
  getInitialPhaseDescription( emitterOn, photonWavelength, photonTarget ) {
    const targetMolecule = this.model.targetMolecule;

    const lightSourceString = WavelengthConstants.getLightSourceName( photonWavelength );

    let targetString = null;
    if ( targetMolecule ) {
      targetString = StringUtils.fillIn( targetMoleculePatternString, {
        photonTarget: PhotonTarget.getMoleculeName( photonTarget )
      } );
    }
    else {
      targetString = emptySpaceString;
    }

    if ( !emitterOn ) {

      // no photons moving, indicate to the user to begin firing photons
      return StringUtils.fillIn( photonEmitterOffDescriptionPatternString, {
        lightSource: lightSourceString,
        target: targetString
      } );
    }
    else {
      return StringUtils.fillIn( inactiveAndPassesPhaseDescriptionPatternString, {
        lightSource: lightSourceString,
        target: targetString
      } );
    }
  }

  /**
   * Get a description of the molecule after it emits a photon. Will return something like
   * "Absorbed Infrared photon emitted from Carbon Dioxide molecule up and to the left."
   * @private
   *
   * @param {Photon} photon - the emitted photon
   * @returns {string}
   */
  getEmissionPhaseDescription( photon ) {
    const photonTargetString = PhotonTarget.getMoleculeName( this.model.photonTargetProperty.get() );
    const lightSourceString = WavelengthConstants.getLightSourceName( photon.wavelength );

    const emissionAngle = Math.atan2( photon.vy, photon.vx );
    const directionString = MovementDescriber.getDirectionDescriptionFromAngle( emissionAngle, {
      modelViewTransform: this.modelViewTransform
    } );

    return StringUtils.fillIn( emissionPhaseDescriptionPatternString, {
      photonTarget: photonTargetString,
      lightSource: lightSourceString,
      direction: directionString
    } );
  }
}

moleculesAndLight.register( 'ObservationWindowDescriber', ObservationWindowDescriber );
export default ObservationWindowDescriber;
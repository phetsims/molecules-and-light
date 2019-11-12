// Copyright 2019, University of Colorado Boulder

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
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants' );
  const PhotonTarget = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/PhotonTarget' );
  const MovementDescriber = require( 'SCENERY_PHET/accessibility/describers/MovementDescriber' );
  const EmissionRateControlSliderNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/EmissionRateControlSliderNode' );
  const MoleculesAndLightA11yStrings = require( 'MOLECULES_AND_LIGHT/common/MoleculesAndLightA11yStrings' );
  const MoleculeUtils = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/MoleculeUtils' );

  // a11y strings
  const emptySpaceString = MoleculesAndLightA11yStrings.emptySpaceString.value;
  const photonEmitterDescriptionPatternString = MoleculesAndLightA11yStrings.photonEmitterDescriptionPatternString.value;
  const targetMoleculePatternString = MoleculesAndLightA11yStrings.targetMoleculePatternString.value;
  const inactiveAndPassingPhaseDescriptionPatternString = MoleculesAndLightA11yStrings.inactiveAndPassingPhaseDescriptionPatternString.value;
  const absorptionPhaseDescriptionPatternString = MoleculesAndLightA11yStrings.absorptionPhaseDescriptionPatternString.value;
  const stretchingString = MoleculesAndLightA11yStrings.stretchingString.value;
  const bendingString = MoleculesAndLightA11yStrings.bendingString.value;
  const glowingString = MoleculesAndLightA11yStrings.glowingString.value;
  const contractingString = MoleculesAndLightA11yStrings.contractingString.value;
  const bendsUpAndDownString = MoleculesAndLightA11yStrings.bendsUpAndDownString.value;
  const startsRotatingPatternString = MoleculesAndLightA11yStrings.startsRotatingPatternString.value;
  const rotatingCounterClockwiseString = MoleculesAndLightA11yStrings.rotatingCounterClockwiseString.value;
  const rotatingClockwiseString = MoleculesAndLightA11yStrings. rotatingClockwiseString.value;
  const startsGlowingString = MoleculesAndLightA11yStrings.startsGlowingString.value;
  const breakApartPhaseDescriptionPatternString = MoleculesAndLightA11yStrings.breakApartPhaseDescriptionPatternString.value;
  const emissionPhaseDescriptionPatternString = MoleculesAndLightA11yStrings.emissionPhaseDescriptionPatternString.value;
  const moleculesOutOfViewPatternString = MoleculesAndLightA11yStrings.moleculesOutOfViewPatternString.value;

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

      // @private {number} while a photon is absorbed the model photonWavelengthProperty may change - we want
      // to describe the absorbed photon not the photon wavelength currently being emitted
      this.wavelengthOnAbsorption = model.photonWavelengthProperty.get();
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
          descriptionNode.accessibleName = this.getInitialPhaseDescription( this.model.emissionFrequencyProperty.get(), photonWavelength, this.model.photonTargetProperty.get() );
        }
      } );

      this.model.emissionFrequencyProperty.link( ( emissionFrequency, oldFrequency ) => {
        if ( ( emissionFrequency === 0 || oldFrequency === 0 ) && this.model.targetMolecule ) {
          descriptionNode.accessibleName = this.getInitialPhaseDescription( emissionFrequency, this.model.photonWavelengthProperty.get(), this.model.photonTargetProperty.get() );
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
        descriptionNode.accessibleName = this.getInitialPhaseDescription( this.model.emissionFrequencyProperty.get(), this.model.photonWavelengthProperty.get(), this.model.photonTargetProperty.get() );
      }

      // vibration
      molecule.currentVibrationRadiansProperty.lazyLink( vibrationRadians => {
        this.moleculeVibrating = molecule.vibratingProperty.get();

        if ( this.moleculeVibrating ) {
          this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
          descriptionNode.accessibleName = this.getVibrationPhaseDescription( vibrationRadians );
        }
      } );

      // rotation
      molecule.rotatingProperty.lazyLink( rotating => {
        this.moleculeRotating = rotating;
        this.moleculeRotatingClockwise = molecule.rotationDirectionClockwiseProperty.get();

        if ( rotating ) {
          this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
          descriptionNode.accessibleName = this.getRotationPhaseDescription();
        }
      } );

      // high electronic energy state (glowing)
      molecule.highElectronicEnergyStateProperty.lazyLink( highEnergy => {
        this.moleculeHighElectronicEnergyState = highEnergy;

        if ( highEnergy ) {
          this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();
          descriptionNode.accessibleName = this.getHighElectronicEnergyPhaseDescription();
        }
      } );

      // re-emission
      molecule.photonEmittedEmitter.addListener( photon => {
        descriptionNode.accessibleName = this.getEmissionPhaseDescription( photon );
      } );

      // break apart
      molecule.brokeApartEmitter.addListener( ( moleculeA, moleculeB ) => {
        this.moleculeBrokeApart = true;
        this.wavelengthOnAbsorption = this.model.photonWavelengthProperty.get();

        descriptionNode.accessibleName = this.getBreakApartPhaseDescription( moleculeA, moleculeB );

        const activeMolecules = this.model.activeMolecules;

        // When the constituent molecules are added to the list of active molecules, add a listener that
        // will describe their removal once they are removed - only needs to be added once on the
        // first addition of a constituent molecule. Must be added on molecule addition because they
        // do not exist in activeMolecules at the time of break apart.
        const addMoleculeRemovalListener = () => {
          const describeMoleculesRemoved = ( molecule, observableArray ) => {
            if ( !activeMolecules.contains( moleculeA ) && !activeMolecules.contains( moleculeB ) ) {
              descriptionNode.accessibleName = this.getMoleculesRemovedDescription( moleculeA, moleculeB );
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
     * @param {number} emissionFrequency
     * @param {number} photonWavelength
     * @param {PhotonTarget} photonTarget
     * @returns {string}
     */
    getInitialPhaseDescription( emissionFrequency, photonWavelength, photonTarget ) {
      const targetMolecule = this.model.targetMolecule;

      const lightSourceString = WavelengthConstants.getLightSourceName( photonWavelength );
      const emissionRateString = EmissionRateControlSliderNode.getEmissionFrequencyDescription( emissionFrequency );

      let targetString = null;
      if ( targetMolecule ) {
        targetString = StringUtils.fillIn( targetMoleculePatternString, {
          photonTarget: PhotonTarget.getMoleculeName( photonTarget )
        } );
      }
      else {
        targetString = emptySpaceString;
      }

      if ( emissionFrequency === 0 ) {

        // no photons moving, indicate to the user to begin firing photons
        return StringUtils.fillIn( photonEmitterDescriptionPatternString, {
          lightSource: lightSourceString,
          emissionRate: emissionRateString,
          target: targetString
        } );
      }
      else {
        return StringUtils.fillIn( inactiveAndPassingPhaseDescriptionPatternString, {
          lightSource: lightSourceString,
          target: targetString
        } );
      }
    }

    /**
     * Gets a description of the vibration representation of absorption. Dependent on whether the molecule is
     * linear/bent and current angle of vibration. Returns something like
     *
     * "Infrared photon absorbed and bonds of carbon monoxide molecule stretching." or
     * "Infrared absorbed and bonds of ozone molecule bending up and down."
     *
     * @param {number} vibrationRadians
     * @returns {string}
     */
    getVibrationPhaseDescription( vibrationRadians ) {
      let descriptionString = '';

      const targetMolecule = this.model.targetMolecule;
      const lightSourceString = WavelengthConstants.getLightSourceName( this.wavelengthOnAbsorption );
      const photonTargetString = PhotonTarget.getMoleculeName( this.model.photonTargetProperty.get() );

      // vibration for molecules with linear geometry represented by expanding/contracting the molecule
      if ( targetMolecule.isLinear() ) {

        // more displacement with -sin( vibrationRadians ) and so when the slope of that function is negative
        // (derivative of sin is cos) the atoms are expanding
        const stretching = Math.cos( vibrationRadians ) < 0;

        descriptionString = StringUtils.fillIn( absorptionPhaseDescriptionPatternString, {
          lightSource: lightSourceString,
          photonTarget: photonTargetString,
          excitedRepresentation: stretching ? stretchingString : contractingString
        } );
      }
      else {

        // more than atoms have non-linear geometry
        descriptionString = StringUtils.fillIn( absorptionPhaseDescriptionPatternString, {
          lightSource: lightSourceString,
          photonTarget: photonTargetString,
          excitedRepresentation: bendsUpAndDownString
        } );
      }

      return descriptionString;
    }

    getRotationPhaseDescription() {
      const targetMolecule = this.model.targetMolecule;
      const lightSourceString = WavelengthConstants.getLightSourceName( this.wavelengthOnAbsorption );
      const photonTargetString = PhotonTarget.getMoleculeName( this.model.photonTargetProperty.get() );

      const rotationString = targetMolecule.rotationDirectionClockwiseProperty.get() ? rotatingClockwiseString : rotatingCounterClockwiseString;
      const startsRotatingString = StringUtils.fillIn( startsRotatingPatternString, {
        rotation: rotationString
      } );

      return StringUtils.fillIn( absorptionPhaseDescriptionPatternString, {
        lightSource: lightSourceString,
        photonTarget: photonTargetString,
        excitedRepresentation: startsRotatingString
      } );
    }

    /**
     * Get a string the describes the molecule when it starts to glow from its high electronic energy state
     * representation after absorption. Will return a string like
     * "‪Visible‬ photon absorbed and bonds of ‪Nitrogen Dioxide‬ molecule starts glowing."
     * @private
     *
     * @returns {string}
     */
    getHighElectronicEnergyPhaseDescription() {
      const lightSourceString = WavelengthConstants.getLightSourceName( this.wavelengthOnAbsorption );
      const photonTargetString = PhotonTarget.getMoleculeName( this.model.photonTargetProperty.get() );

      return StringUtils.fillIn( absorptionPhaseDescriptionPatternString, {
        lightSource: lightSourceString,
        photonTarget: photonTargetString,
        excitedRepresentation: startsGlowingString
      } );
    }

    /**
     * Returns a string that describes the molecule after it breaks apart into two other molecules. Will return
     * a string like
     * "Ultraviolet photon absorbed and Ozone molecule breaks apart into O2 and O."
     *
     * @returns {string}
     */
    getBreakApartPhaseDescription( firstMolecule, secondMolecule ) {
      const lightSourceString = WavelengthConstants.getLightSourceName( this.wavelengthOnAbsorption );
      const photonTargetString = PhotonTarget.getMoleculeName( this.model.photonTargetProperty.get() );

      const firstMolecularFormula = MoleculeUtils.getMolecularFormula( firstMolecule );
      const secondMolecularFormula = MoleculeUtils.getMolecularFormula( secondMolecule );

      return StringUtils.fillIn( breakApartPhaseDescriptionPatternString, {
        lightSource: lightSourceString,
        photonTarget: photonTargetString,
        firstMolecule: firstMolecularFormula,
        secondMolecule: secondMolecularFormula
      } );
    }

    /**
     * Get a description of the molecule after it emits a photon. Will return something like
     * "Carbon Monoxide molecule stops stretching and emits absorbed photon up and to the left."
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

      let representationString = null;
      if ( this.moleculeVibrating ) {
        representationString = this.model.targetMolecule.isLinear() ? stretchingString : bendingString;
      }
      else if ( this.moleculeHighElectronicEnergyState ) {
        representationString = glowingString;
      }
      else if ( this.moleculeRotating ) {
        representationString = this.moleculeRotatingClockwise ? rotatingClockwiseString : rotatingCounterClockwiseString;
      }
      else {
        throw new Error( 'undhandled excitation representation' );
      }

      return StringUtils.fillIn( emissionPhaseDescriptionPatternString, {
        photonTarget: photonTargetString,
        excitedRepresentation: representationString,
        lightSource: lightSourceString,
        direction: directionString
      } );
    }

    getMoleculesRemovedDescription( firstMolecule, secondMolecule ) {
      const firstMolecularFormula = MoleculeUtils.getMolecularFormula( firstMolecule );
      const secondMolecularFormula = MoleculeUtils.getMolecularFormula( secondMolecule );

      return StringUtils.fillIn( moleculesOutOfViewPatternString, {
        firstMolecule: firstMolecularFormula,
        secondMolecule: secondMolecularFormula
      } );
    }
  }

  return moleculesAndLight.register( 'ObservationWindowDescriber', ObservationWindowDescriber );
} );
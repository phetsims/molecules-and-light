// Copyright 2019-2020, University of Colorado Boulder

/**
 * TODO: Type Documentation
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import moleculesAndLightStrings from '../../molecules-and-light-strings.js';
import moleculesAndLight from '../../moleculesAndLight.js';
import PhotonTarget from '../../photon-absorption/model/PhotonTarget.js';
import WavelengthConstants from '../../photon-absorption/model/WavelengthConstants.js';
import EmissionRateControlSliderNode from '../../photon-absorption/view/EmissionRateControlSliderNode.js';

const playAreaSummaryString = moleculesAndLightStrings.a11y.playAreaSummary;
const controlAreaSummaryString = moleculesAndLightStrings.a11y.controlAreaSummary;
const dynamicScreenSummaryString = moleculesAndLightStrings.a11y.dynamicScreenSummary;
const emitterInObservationWindowString = moleculesAndLightStrings.a11y.emitterInObservationWindow;
const emitterPausedInObservationWindowString = moleculesAndLightStrings.a11y.emitterPausedInObservationWindow;
const interactionHintString = moleculesAndLightStrings.a11y.interactionHint;
const targetMoleculePatternString = moleculesAndLightStrings.a11y.targetMoleculePattern;
const screenSummaryWithHintPatternString = moleculesAndLightStrings.a11y.screenSummaryWithHintPattern;
const emptySpaceString = moleculesAndLightStrings.a11y.emptySpace;
const interactionHintWithPlayPatternString = moleculesAndLightStrings.a11y.interactionHintWithPlayPattern;

class MoleculesAndLightScreenSummaryNode extends Node {

  /**
   * @param {PhotonAbsorptionModel} model
   * @param {BooleanProperty} returnMoleculeButtonVisibleProperty
   */
  constructor( model, returnMoleculeButtonVisibleProperty ) {
    super();

    // @private {PhotonAbsorptionModel}
    this.model = model;

    // @private {BooleanProperty}
    this.returnMoleculeButtonVisibleProperty = returnMoleculeButtonVisibleProperty;

    // static summary of the play area
    this.addChild( new Node( {
      tagName: 'p',
      accessibleName: playAreaSummaryString
    } ) );

    // static summary of the control area
    this.addChild( new Node( {
      tagName: 'p',
      accessibleName: controlAreaSummaryString
    } ) );

    // dynamic overview that stays up to date with sim
    const dynamicDescription = new Node( { tagName: 'p' } );
    this.addChild( dynamicDescription );

    const summaryProperties = [ model.photonWavelengthProperty, model.emissionFrequencyProperty, model.photonTargetProperty, model.runningProperty, returnMoleculeButtonVisibleProperty ];
    Property.multilink( summaryProperties, ( photonWavelength, emissionFrequency, photonTarget, running, returnMoleculeButtonVisible ) => {

      // TODO: Maybe use accessibleName instead if https://github.com/phetsims/molecules-and-light/issues/237 is fixed
      dynamicDescription.innerContent = this.getSummaryString( photonWavelength, emissionFrequency, photonTarget, running, returnMoleculeButtonVisible );
    } );

    // interaction hint, add a hint about the "Play" button if sim is paused
    const interactionHint = new Node( { tagName: 'p' } );
    model.runningProperty.link( running => {
      if ( running ) {
        interactionHint.innerContent = interactionHintString;
      }
      else {
        interactionHint.innerContent = StringUtils.fillIn( interactionHintWithPlayPatternString, {
          interactionHint: interactionHintString
        } );
      }
    } );

    this.addChild( interactionHint );
  }

  /**
   * Get the dynamic summary for the simulation, something like
   * "Currently, in observation window, Infrared light source is off and points at carbon monoxide molecule."
   * @private
   *
   * @param {number} photonWavelength
   * @param {number} emissionFrequency
   * @param {PhotonTarget} photonTarget
   * @param {boolean} running
   * @param {boolean} returnMoleculeButtonVisible
   * @returns {string}
   */
  getSummaryString( photonWavelength, emissionFrequency, photonTarget, running, returnMoleculeButtonVisible ) {
    const targetMolecule = this.model.targetMolecule;

    const playingStateString = running ? emitterInObservationWindowString : emitterPausedInObservationWindowString;
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

    const screenSummaryString = StringUtils.fillIn( dynamicScreenSummaryString, {
      playingState: playingStateString,
      lightSource: lightSourceString,
      emissionRate: emissionRateString,
      target: targetString
    } );

    // if the "New Molecule" button is visible, include a description of its existence in the screen summary
    if ( returnMoleculeButtonVisible ) {
      return StringUtils.fillIn( screenSummaryWithHintPatternString, {
        summary: screenSummaryString
      } );
    }
    else {
      return screenSummaryString;
    }

  }
}

moleculesAndLight.register( 'MoleculesAndLightScreenSummaryNode', MoleculesAndLightScreenSummaryNode );
export default MoleculesAndLightScreenSummaryNode;
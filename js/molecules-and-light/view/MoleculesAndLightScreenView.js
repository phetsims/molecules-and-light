// Copyright 2014-2023, University of Colorado Boulder

/**
 * View for Molecules and Light.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 *
 */

import MicroScreenView from '../../../../greenhouse-effect/js/micro/view/MicroScreenView.js';
import moleculesAndLight from '../../moleculesAndLight.js';

class MoleculesAndLightScreenView extends MicroScreenView {

  /**
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {Tandem} tandem
   */
  constructor( photonAbsorptionModel, tandem ) {
    super( photonAbsorptionModel, tandem );
  }
}

moleculesAndLight.register( 'MoleculesAndLightScreenView', MoleculesAndLightScreenView );
export default MoleculesAndLightScreenView;

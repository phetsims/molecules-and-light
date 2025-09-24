// Copyright 2014-2025, University of Colorado Boulder

/**
 * View for Molecules and Light.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 *
 */

import PhotonAbsorptionModel from '../../../../greenhouse-effect/js/micro/model/PhotonAbsorptionModel.js';
import MicroScreenView from '../../../../greenhouse-effect/js/micro/view/MicroScreenView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculesAndLight from '../../moleculesAndLight.js';

class MoleculesAndLightScreenView extends MicroScreenView {
  public constructor( photonAbsorptionModel: PhotonAbsorptionModel, tandem: Tandem ) {
    super( photonAbsorptionModel, tandem );
  }
}

moleculesAndLight.register( 'MoleculesAndLightScreenView', MoleculesAndLightScreenView );
export default MoleculesAndLightScreenView;
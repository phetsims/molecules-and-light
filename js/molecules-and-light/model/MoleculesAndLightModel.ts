// Copyright 2020-2023, University of Colorado Boulder

/**
 * The model for MoleculesAndLight.
 *
 * @author Jesse Greenberg
 */

import GreenhouseEffectQueryParameters from '../../../../greenhouse-effect/js/common/GreenhouseEffectQueryParameters.js';
import PhotonAbsorptionModel from '../../../../greenhouse-effect/js/micro/model/PhotonAbsorptionModel.js';
import PhotonTarget from '../../../../greenhouse-effect/js/micro/model/PhotonTarget.js';
import moleculesAndLight from '../../moleculesAndLight.js';

/**
 * @public
 */
class MoleculesAndLightModel extends PhotonAbsorptionModel {
  constructor( tandem ) {

    const initialTarget = GreenhouseEffectQueryParameters.openSciEd ?
                          PhotonTarget.SINGLE_N2_MOLECULE :
                          PhotonTarget.SINGLE_CO_MOLECULE;
    super( initialTarget, tandem );
  }
}

moleculesAndLight.register( 'MoleculesAndLightModel', MoleculesAndLightModel );
export default MoleculesAndLightModel;
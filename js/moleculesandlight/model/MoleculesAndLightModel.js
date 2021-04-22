// Copyright 2020, University of Colorado Boulder

/**
 * The model for MoleculesAndLight.
 *
 * @author Jesse Greenberg
 */

import MoleculesAndLightQueryParameters from '../../common/MoleculesAndLightQueryParameters.js';
import moleculesAndLight from '../../moleculesAndLight.js';
import PhotonAbsorptionModel from '../../photon-absorption/model/PhotonAbsorptionModel.js';
import PhotonTarget from '../../photon-absorption/model/PhotonTarget.js';

/**
 * @public
 */
class MoleculesAndLightModel extends PhotonAbsorptionModel {
  constructor( tandem ) {

    const initialTarget = MoleculesAndLightQueryParameters.openSciEd ? PhotonTarget.SINGLE_N2_MOLECULE : PhotonTarget.SINGLE_CO_MOLECULE;
    super( initialTarget, tandem );
  }
}

moleculesAndLight.register( 'MoleculesAndLightModel', MoleculesAndLightModel );
export default MoleculesAndLightModel;
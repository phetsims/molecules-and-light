// Copyright 2020, University of Colorado Boulder

/**
 * The model for MoleculesAndLight.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../../moleculesAndLight.js';
import PhotonAbsorptionModel from '../../photon-absorption/model/PhotonAbsorptionModel.js';
import PhotonTarget from '../../photon-absorption/model/PhotonTarget.js';

/**
 * @public
 */
class MoleculesAndLightModel extends PhotonAbsorptionModel {
  constructor( tandem ) {
    super( PhotonTarget.SINGLE_CO_MOLECULE, tandem );

    // Clear all photons to avoid cases where photons of the previous wavelength
    // could be absorbed after new wavelength was selected. Some users interpreted
    // absorption of the previous wavelength as absorption of the selected wavelength
    this.photonWavelengthProperty.link( () => {
      this.resetPhotons();
    } );
  }
}

moleculesAndLight.register( 'MoleculesAndLightModel', MoleculesAndLightModel );
export default MoleculesAndLightModel;
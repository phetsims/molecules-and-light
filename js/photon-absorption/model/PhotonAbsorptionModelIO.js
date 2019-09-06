// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for PhotonAbsorptionModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var PhotonIO = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/PhotonIO' );
  var validate = require( 'AXON/validate' );

  class PhotonAbsorptionModelIO extends ObjectIO {
    static clearChildInstances( photonAbsorptionModel ) {
      validate( photonAbsorptionModel, this.validator );
      photonAbsorptionModel.clearPhotons();
      // instance.chargedParticles.clear();
      // instance.electricFieldSensors.clear();
    }

    /**
     * Create a dynamic particle as specified by the phetioID and state.
     * @param {Object} photonAbsorptionModel
     * @param {Tandem} tandem
     * @param {Object} stateObject
     * @returns {ChargedParticle}
     */
    static addChildInstance( photonAbsorptionModel, tandem, stateObject ) {
      validate( photonAbsorptionModel, this.validator );
      var value = PhotonIO.fromStateObject( stateObject );

      var photon = new phet.moleculesAndLight.Photon( value.wavelength, tandem );
      photon.setVelocity( stateObject.vx, stateObject.vy );
      photonAbsorptionModel.photons.add( photon );
    }
  }

  PhotonAbsorptionModelIO.documentation = 'The model for Photon Absorption';
  PhotonAbsorptionModelIO.validator = { isValidValue: v => v instanceof phet.moleculesAndLight.PhotonAbsorptionModel };
  PhotonAbsorptionModelIO.typeName = 'PhotonAbsorptionModelIO';
  ObjectIO.validateSubtype( PhotonAbsorptionModelIO );

  return moleculesAndLight.register( 'PhotonAbsorptionModelIO', PhotonAbsorptionModelIO );
} );


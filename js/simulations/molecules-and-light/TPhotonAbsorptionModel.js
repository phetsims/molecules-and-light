// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TPhoton = require( 'PHET_IO/simulations/molecules-and-light/TPhoton' );

  // Instrumented to help restore charged particles.
  var TPhotonAbsorptionModel = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.moleculesAndLight.PhotonAbsorptionModel );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TPhotonAbsorptionModel', TPhotonAbsorptionModel, {}, {
      clearChildInstances: function( instance ) {
        instance.clearPhotons();
        // instance.chargedParticles.clear();
        // instance.electricFieldSensors.clear();
      },

      /**
       * Create a dynamic particle as specified by the phetioID and state.
       * @param {Object} instance
       * @param {Tandem} tandem
       * @param {Object} stateObject
       * @returns {ChargedParticle}
       */
      addChildInstance: function( instance, tandem, stateObject ) {
        var value = TPhoton.fromStateObject( stateObject );

        var photon = new phet.moleculesAndLight.Photon( value.wavelength, tandem );
        photon.setVelocity( stateObject.vx, stateObject.vy );
        instance.photons.add( photon );
      }
    }
  );

  phetioNamespace.register( 'TPhotonAbsorptionModel', TPhotonAbsorptionModel );

  return TPhotonAbsorptionModel;
} );


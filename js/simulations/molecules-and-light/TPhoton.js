// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TNumber = require( 'PHET_IO/types/TNumber' );

  var TPhoton = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.moleculesAndLight.Photon );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( Object, 'TPhoton', TPhoton, {}, {

    fromStateObject: function( stateObject ) {
      return {
        vx: TNumber().fromStateObject( stateObject.vx ),
        vy: TNumber().fromStateObject( stateObject.vy ),
        wavelength: TNumber().fromStateObject( stateObject.wavelength )
      };
    },

    toStateObject: function( value ) {
      return {
        vx: TNumber().toStateObject( value.vx ),
        vy: TNumber().toStateObject( value.vy ),
        wavelength: TNumber().toStateObject( value.wavelength )
      };
    },

    setValue: function( instance, value ) {}
  } );

  phetioNamespace.register( 'TPhoton', TPhoton );

  return TPhoton;
} );


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

  var TPhoton = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.moleculesAndLight.Photon );
    Object.call( this, instance, phetioID );
  };

  phetioInherit( Object, 'TPhoton', TPhoton, {}, {

    fromStateObject: function( stateObject ) {
      return window.phet.moleculesAndLight.Photon.fromStateObject( stateObject );
    },

    toStateObject: function( value ) {
      return value.toStateObject();
    },

    setValue: function() {}
  } );

  phetioNamespace.register( 'TPhoton', TPhoton );

  return TPhoton;
} );


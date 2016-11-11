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

  var TMolecule = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.moleculesAndLight.Molecule );
    Object.call( this, instance, phetioID );
  };

  phetioInherit( Object, 'TMolecule', TMolecule, {}, {

    fromStateObject: function( stateObject ) {
      return window.phet.moleculesAndLight.Molecule.fromStateObject( stateObject );
    },

    toStateObject: function( value ) {
      return value.toStateObject();
    },

    setValue: function( instance, value) {}
  } );

  phetioNamespace.register( 'TMolecule', TMolecule );

  return TMolecule;
} );


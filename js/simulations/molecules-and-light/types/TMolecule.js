// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );

  var TMolecule = phetioInherit( Object, 'TMolecule', function( instance, phetioID ) {
    assertInstanceOf( instance, phet.moleculesAndLight.Molecule );
    Object.call( this, instance, phetioID );
  }, {}, {
    fromStateObject: function( stateObject ) {
      return window.phet.moleculesAndLight.Molecule.fromStateObject( stateObject );
    },
    toStateObject: function( value ) {
      return value.toStateObject();
    },
    setValue: function() {}
  } );

  phetioNamespace.register( 'TMolecule', TMolecule );

  return TMolecule;
} );


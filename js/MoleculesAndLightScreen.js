//  Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Molecules and Light' screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var PhotonAbsorptionModel = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionModel' );
  var MoleculesAndLightScreenView = require( 'MOLECULES_AND_LIGHT/view/MoleculesAndLightScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var titleString = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.name' );

  function MoleculesAndLightScreen() {
    Screen.call( this, titleString, null /* no icon, single-screen sim */,
      function() { return new PhotonAbsorptionModel( 'SINGLE_CO_MOLECULE' ); },
      function( model ) { return new MoleculesAndLightScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, MoleculesAndLightScreen );
} );
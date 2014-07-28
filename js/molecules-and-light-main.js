//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var MoleculesAndLightScreen = require( 'MOLECULES_AND_LIGHT/MoleculesAndLightScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.name' );

  var simOptions = {
    credits: {

      // all credits fields are optional
      leadDesign: 'Groucho',
      softwareDevelopment: 'Harpo',
      designTeam: 'Curly, Larry, Mo',
      interviews: 'Wile E. Coyote',
      thanks: 'Thanks to the ACME Dynamite Company for funding this sim!'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new MoleculesAndLightScreen() ], simOptions );
    sim.start();
  } );
} );
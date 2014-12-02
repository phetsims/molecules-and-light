//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var MoleculesAndLightScreen = require( 'MOLECULES_AND_LIGHT/moleculesandlight/MoleculesAndLightScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.name' );

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Sam Reid, Chris Malley, Aaron Davis, Jesse Greenberg',
      team: 'Trish Loeblein, Robert Parson, Kathy Perkins, Ariel Paul, Amy Rouinfar',
      interviews: 'Kelly Lancaster'
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
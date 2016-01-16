// Copyright 2014-2015, University of Colorado Boulder

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
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var moleculesAndLightTitleString = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.title' );

  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
      softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
      team: 'Yuen-ying Carpenter, Trish Loeblein, Emily Moore, Robert Parson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Alex Klinger'
    },
    tandem: tandem
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( moleculesAndLightTitleString, [ new MoleculesAndLightScreen( tandem.createTandem( 'moleculesAndLightScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
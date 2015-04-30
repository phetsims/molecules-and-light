// Copyright 2002-2014, University of Colorado Boulder

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
  var simTitle = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.name' );

  var tandem = new Tandem();

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
      softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
      team: 'Yuen-ying Carpenter, Trish Loeblein, Emily Moore, Robert Parson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Oliver Orejola, Bryan Yoelin',
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
    var sim = new Sim( simTitle, [ new MoleculesAndLightScreen( tandem.createTandem( 'moleculesAndLightScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
// Copyright 2014-2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var MoleculesAndLightScreen = require( 'MOLECULES_AND_LIGHT/moleculesandlight/MoleculesAndLightScreen' );
  var MoleculesAndLightKeyboardHelpContent = require( 'MOLECULES_AND_LIGHT/common/view/MoleculesAndLightKeyboardHelpContent' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var moleculesAndLightTitleString = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.title' );

  var tandem = Tandem.createRootTandem();
  var keyboardHelpContent = new MoleculesAndLightKeyboardHelpContent();

  var simOptions = {
    keyboardHelpNode: keyboardHelpContent,

    credits: {
      leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
      softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
      team: 'Yuen-ying Carpenter, Trish Loeblein, Emily Moore, Robert Parson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Alex Klinger'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( moleculesAndLightTitleString, [ new MoleculesAndLightScreen( tandem.createTandem( 'moleculesAndLightScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var MoleculesAndLightKeyboardHelpContent = require( 'MOLECULES_AND_LIGHT/common/view/MoleculesAndLightKeyboardHelpContent' );
  var MoleculesAndLightScreen = require( 'MOLECULES_AND_LIGHT/moleculesandlight/MoleculesAndLightScreen' );
  var platform = require( 'PHET_CORE/platform' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var moleculesAndLightTitleString = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.title' );

  var tandem = Tandem.rootTandem;
  var keyboardHelpContent = new MoleculesAndLightKeyboardHelpContent( Tandem.globalTandem.createTandem( 'keyboardHelpContent' ) );

  var simOptions = {
    keyboardHelpNode: keyboardHelpContent,

    credits: {
      leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
      softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
      team: 'Yuen-ying Carpenter, Trish Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Alex Klinger'
    }
  };

  // if using Edge, render the photon layer and emitter with SVG for improved performance, see #175
  if ( platform.edge ) {
    simOptions.rootRenderer = 'svg';
  }

  SimLauncher.launch( function() {
    var sim = new Sim( moleculesAndLightTitleString, [ new MoleculesAndLightScreen( tandem.createTandem( 'moleculesAndLightScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
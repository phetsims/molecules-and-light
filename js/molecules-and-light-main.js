// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const MoleculesAndLightKeyboardHelpContent = require( 'MOLECULES_AND_LIGHT/common/view/MoleculesAndLightKeyboardHelpContent' );
  const MoleculesAndLightScreen = require( 'MOLECULES_AND_LIGHT/moleculesandlight/MoleculesAndLightScreen' );
  const platform = require( 'PHET_CORE/platform' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const moleculesAndLightTitleString = require( 'string!MOLECULES_AND_LIGHT/molecules-and-light.title' );

  var keyboardHelpContent = new MoleculesAndLightKeyboardHelpContent();

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
    var sim = new Sim( moleculesAndLightTitleString, [
      new MoleculesAndLightScreen( Tandem.rootTandem.createTandem( 'moleculesAndLightScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );
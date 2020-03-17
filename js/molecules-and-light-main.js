// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import platform from '../../phet-core/js/platform.js';
import Tandem from '../../tandem/js/Tandem.js';
import MoleculesAndLightKeyboardHelpContent from './common/view/MoleculesAndLightKeyboardHelpContent.js';
import moleculesAndLightStrings from './molecules-and-light-strings.js';
import MoleculesAndLightScreen from './moleculesandlight/MoleculesAndLightScreen.js';

const moleculesAndLightTitleString = moleculesAndLightStrings[ 'molecules-and-light' ].title;

const keyboardHelpContent = new MoleculesAndLightKeyboardHelpContent();

const simOptions = {
  keyboardHelpNode: keyboardHelpContent,

  credits: {
    leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
    softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
    team: 'Yuen-ying Carpenter, Trish Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
    graphicArts: 'Alex Klinger',
    soundDesign: 'Ashton Morris, Mike Winters'
  }
};

// if using Edge, render the photon layer and emitter with SVG for improved performance, see #175
if ( platform.edge ) {
  simOptions.rootRenderer = 'svg';
}

SimLauncher.launch( function() {
  const sim = new Sim( moleculesAndLightTitleString, [
    new MoleculesAndLightScreen( Tandem.ROOT.createTandem( 'moleculesAndLightScreen' ) )
  ], simOptions );
  sim.start();
} );
// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Jesse Greenberg
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import platform from '../../phet-core/js/platform.js';
import Tandem from '../../tandem/js/Tandem.js';
import moleculesAndLightStrings from './moleculesAndLightStrings.js';
import MoleculesAndLightScreen from './molecules-and-light/MoleculesAndLightScreen.js';

const moleculesAndLightTitleString = moleculesAndLightStrings[ 'molecules-and-light' ].title;

const simOptions = {
  hasKeyboardHelpContent: true,

  credits: {
    leadDesign: 'Kelly Lancaster (Java), Amy Rouinfar (HTML5)',
    softwareDevelopment: 'Jesse Greenberg, John Blanco, Sam Reid, Aaron Davis',
    team: 'Yuen-ying Carpenter, Brett Fiedler, Trish Loeblein, Wanda Diaz Merced, Emily B. Moore, Matthew Moore, Robert Parson, Ariel Paul, Kathy Perkins, Taliesin Smith, Brianna Tomlinson, Syan Zhou',
    qualityAssurance: 'Jaspe Arias, Logan Bray, Steele Dalton, Brooklyn Lash, Elise Morgan, Liam Mulhall, Oliver Orejola, Devon Quispe, Kathryn Woessner, Bryan Yoelin',
    graphicArts: 'Alex Klinger',
    soundDesign: 'Ashton Morris, Mike Winters'
  }
};

// if using Edge, render the photon layer and emitter with SVG for improved performance, see #175
if ( platform.edge ) {
  simOptions.rootRenderer = 'svg';
}

simLauncher.launch( () => {
  const sim = new Sim( moleculesAndLightTitleString, [
    new MoleculesAndLightScreen( Tandem.ROOT.createTandem( 'moleculesAndLightScreen' ) )
  ], simOptions );
  sim.start();
} );
// Copyright 2020, University of Colorado Boulder

/**
 * MoleculesAndLightConstants is a collection of constants used throughout this simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import moleculesAndLight from '../moleculesAndLight.js';
import MoleculesAndLightQueryParameters from './MoleculesAndLightQueryParameters.js';

const MoleculesAndLightConstants = {
  USE_SPATIALIZED_SOUNDS: MoleculesAndLightQueryParameters.useStereoSounds
};

moleculesAndLight.register( 'MoleculesAndLightConstants', MoleculesAndLightConstants );
export default MoleculesAndLightConstants;

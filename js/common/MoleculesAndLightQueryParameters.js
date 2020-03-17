// Copyright 2020, University of Colorado Boulder

/**
 * Query parameters for molecules-and-light.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../moleculesAndLight.js';

const MoleculesAndLightQueryParameters = QueryStringMachine.getAll( {

  // For testing, as we decide when the best emission frequency is for the "on" photon emitter. 0 has the emitter
  // completely off, 1 has the emission frequency match fastest rate at published version of the sim.
  emissionFrequency: {
    type: 'number',
    defaultValue: 0.85,
    isValidValue: value => {
      return 0 <= value && value <= 1;
    }
  },

  // For testing as we decide how fast sim should play at the "slow" setting. This value is a proportion of the "normal"
  // speed, so default 0.3 means slow time moves 30% as fast as fast "normal" time.
  slowSpeed: {
    type: 'number',
    defaultValue: 0.3,
    isValidValue: value => {
      return 0 <= value && value <= 1;
    }
  },

  // for testing as we decide whether to use stereo or mono sounds for some of the sonification
  useStereoSounds: {
    type: 'flag'
  }

} );

moleculesAndLight.register( 'MoleculesAndLightQueryParameters', MoleculesAndLightQueryParameters );

export default MoleculesAndLightQueryParameters;
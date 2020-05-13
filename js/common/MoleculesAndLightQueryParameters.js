// Copyright 2020, University of Colorado Boulder

/**
 * Query parameters for molecules-and-light.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../moleculesAndLight.js';

const MoleculesAndLightQueryParameters = QueryStringMachine.getAll( {

  // For testing to decide on whether or not to disable the PlayPauseButton when the photon emitter is off.
  // See https://github.com/phetsims/molecules-and-light/issues/320
  disablePlayPause: { type: 'flag' },

  // For testing description output - in the case where a photon/molecule pair has no absorption strategy,
  // this is the number of "pass through" events to announce before letting the user know that no absorption
  // is occurring. See https://github.com/phetsims/molecules-and-light/issues/333
  passThroughCount: { type: 'number', defaultValue: 5 }
} );

moleculesAndLight.register( 'MoleculesAndLightQuerameters', MoleculesAndLightQueryParameters );

export default MoleculesAndLightQueryParameters;
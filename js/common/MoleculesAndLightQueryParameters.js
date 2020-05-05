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

  // For testing to decide if we will have a different time step for the keyboard command to move forward in time,
  // see https://github.com/phetsims/molecules-and-light/issues/336
  keyboardTimeStep: {
    type: 'number',
    defaultValue: 1 / 60
  }
} );

moleculesAndLight.register( 'MoleculesAndLightQueryParameters', MoleculesAndLightQueryParameters );

export default MoleculesAndLightQueryParameters;
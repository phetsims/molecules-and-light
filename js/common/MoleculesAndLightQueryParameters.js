// Copyright 2020, University of Colorado Boulder

/**
 * Query parameters for molecules-and-light.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../moleculesAndLight.js';

const MoleculesAndLightQueryParameters = QueryStringMachine.getAll( {

  // whether or not to run with customizations for Open Sci Ed
  openSciEd: { type: 'flag' },

  // For testing to decide on whether or not to disable the PlayPauseButton when the photon emitter is off.
  // See https://github.com/phetsims/molecules-and-light/issues/320
  disablePlayPause: { type: 'flag' }
} );

moleculesAndLight.register( 'MoleculesAndLightQueryParameters', MoleculesAndLightQueryParameters );

export default MoleculesAndLightQueryParameters;
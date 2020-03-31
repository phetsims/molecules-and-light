// Copyright 2020, University of Colorado Boulder

/**
 * Query parameters for molecules-and-light.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../moleculesAndLight.js';

const MoleculesAndLightQueryParameters = QueryStringMachine.getAll( {

  // For testing, as we decide what kind of PDOM representation the "On" button for the Photon Emitter
  // should have. If included, it will be represented as a "switch" rather than a push button, see
  // https://github.com/phetsims/molecules-and-light/issues/296
  switch: { type: 'flag' },

  // For testing to decide on whether or not to disable the PlayPauseButton when the photon emitter is off.
  // See https://github.com/phetsims/molecules-and-light/issues/320
  disablePlayPause: { type: 'flag' }
} );

moleculesAndLight.register( 'MoleculesAndLightQueryParameters', MoleculesAndLightQueryParameters );

export default MoleculesAndLightQueryParameters;
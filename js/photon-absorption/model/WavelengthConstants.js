// Copyright 2014-2019, University of Colorado Boulder

/**
 * Wavelength Constants for photons of the PhotonAbsorptionModel
 *
 * @author Jesse Greenberg (Phet Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import moleculesAndLightStrings from '../../molecules-and-light-strings.js';
import moleculesAndLight from '../../moleculesAndLight.js';

const quadWavelengthSelectorInfraredString = moleculesAndLightStrings.QuadWavelengthSelector.Infrared;
const quadWavelengthSelectorMicrowaveString = moleculesAndLightStrings.QuadWavelengthSelector.Microwave;
const quadWavelengthSelectorUltravioletString = moleculesAndLightStrings.QuadWavelengthSelector.Ultraviolet;
const quadWavelengthSelectorVisibleString = moleculesAndLightStrings.QuadWavelengthSelector.Visible;

const WavelengthConstants = {

  // all values in meters
  SUNLIGHT_WAVELENGTH: 400E-9, // Ported from the original JAVA version, but not used in Molecules And Light
  MICRO_WAVELENGTH: 0.2,
  IR_WAVELENGTH: 850E-9,
  VISIBLE_WAVELENGTH: 580E-9,
  UV_WAVELENGTH: 100E-9,
  DEBUG_WAVELENGTH: 1,

  // Given a wavelength, look up the tandem name for an emitter
  // This is required because the simulation is driven by the wavelength value.  If this code is too unmaintainable,
  // we could rewrite the sim to use Emitter instances, each of which has a wavelength and a tandem name
  // See, for example: PhotonEmitterNode
  getTandemName: function( wavelength ) {
    return wavelength === this.SUNLIGHT_WAVELENGTH ? 'sunlight' :
           wavelength === this.MICRO_WAVELENGTH ? 'microwave' :
           wavelength === this.IR_WAVELENGTH ? 'infrared' :
           wavelength === this.VISIBLE_WAVELENGTH ? 'visible' :
           wavelength === this.UV_WAVELENGTH ? 'ultraviolet' :
           assert( false, 'unknown' );
  },


  /**
   * Given a wavelength, get the name of the lightSource that it belongs too. This is used by a11y to get the correct
   * name of the wavelength in human form.
   * TODO: use this in QuadEmissionFrequencyControlPanel.js to clean up boilerplate.
   * @param {number} wavelength
   * @returns {string}
   */
  getLightSourceName: function( wavelength ) {
    return wavelength === this.MICRO_WAVELENGTH ? quadWavelengthSelectorMicrowaveString :
           wavelength === this.IR_WAVELENGTH ? quadWavelengthSelectorInfraredString :
           wavelength === this.VISIBLE_WAVELENGTH ? quadWavelengthSelectorVisibleString :
           wavelength === this.UV_WAVELENGTH ? quadWavelengthSelectorUltravioletString :
           assert( false, 'unknown' );
  }
};

moleculesAndLight.register( 'WavelengthConstants', WavelengthConstants );

export default WavelengthConstants;
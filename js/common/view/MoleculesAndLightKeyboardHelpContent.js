// Copyright 2017-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const SliderAndGeneralKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderAndGeneralKeyboardHelpContent' );

  // strings
  const keyboardHelpDialogLightSourceSliderString = require( 'string!MOLECULES_AND_LIGHT/KeyboardHelpDialog.lightSourceSlider' );

  class MoleculesAndLightKeyboardHelpContent extends SliderAndGeneralKeyboardHelpContent {

    /**
     * @param {tandem} tandem
     */
    constructor( tandem ) {
      super( {
        sliderSectionOptions: {
          headingString: keyboardHelpDialogLightSourceSliderString
        },
        generalSectionOptions: {
          withGroupContent: true
        },
        tandem: tandem
      } );
    }
  }

  return moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
} );
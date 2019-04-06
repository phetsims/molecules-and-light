// Copyright 2017-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );
  const TwoColumnKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/TwoColumnKeyboardHelpContent' );

  // strings
  const keyboardHelpDialogLightSourceSliderString = require( 'string!MOLECULES_AND_LIGHT/KeyboardHelpDialog.lightSourceSlider' );

  // constants
  const HELP_SECTION_OPTIONS = {
    labelMaxWidth: 160 // i18n, a bit shorter than default so general and slider sections fits side by side
  };

  class MoleculesAndLightKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

    /**
     * @param {tandem} tandem
     */
    constructor( tandem ) {

      const sliderHelpSection = new SliderKeyboardHelpSection( _.extend( HELP_SECTION_OPTIONS, {
        headingString: keyboardHelpDialogLightSourceSliderString
      } ) );
      const generalNavigationHelpSection = new GeneralKeyboardHelpSection( _.extend( HELP_SECTION_OPTIONS, {
        withGroupContent: true
      } ) );

      super( sliderHelpSection, generalNavigationHelpSection, {
        tandem: tandem
      } );
    }
  }

  return moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
} );
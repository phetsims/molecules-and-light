// Copyright 2017-2020, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import SliderAndGeneralKeyboardHelpContent
  from '../../../../scenery-phet/js/keyboard/help/SliderAndGeneralKeyboardHelpContent.js';
import moleculesAndLightStrings from '../../moleculesAndLightStrings.js';
import moleculesAndLight from '../../moleculesAndLight.js';

const keyboardHelpDialogLightSourceSliderString = moleculesAndLightStrings.KeyboardHelpDialog.lightSourceSlider;

class MoleculesAndLightKeyboardHelpContent extends SliderAndGeneralKeyboardHelpContent {
  constructor() {
    super( {
      sliderSectionOptions: {
        headingString: keyboardHelpDialogLightSourceSliderString
      },
      generalSectionOptions: {
        withGroupContent: true
      }
    } );
  }
}

moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
export default MoleculesAndLightKeyboardHelpContent;
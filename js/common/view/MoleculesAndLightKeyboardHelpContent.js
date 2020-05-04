// Copyright 2017-2020, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GeneralKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GeneralKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import moleculesAndLight from '../../moleculesAndLight.js';
import moleculesAndLightStrings from '../../moleculesAndLightStrings.js';

const keyboardHelpDialogObservationWindowString = moleculesAndLightStrings.keyboardHelpDialog.observationWindow;
const turnLightSourceOnOrOffString = moleculesAndLightStrings.keyboardHelpDialog.turnLightSourceOnOrOff;
const turnLightSourceOnOrOffDescriptionString = moleculesAndLightStrings.a11y.keyboardHelpDialog.turnLightSourceOnOrOffDescription;
const pauseOrPlayShortcutString = moleculesAndLightStrings.keyboardHelpDialog.pauseOrPlayShortcut;
const pauseOrPlayShortcutDescriptionString = moleculesAndLightStrings.a11y.keyboardHelpDialog.pauseOrPlayShortcutDescription;

class MoleculesAndLightKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  constructor() {

    const lightSourceRow = KeyboardHelpSection.labelWithIcon(
      turnLightSourceOnOrOffString,
      KeyboardHelpIconFactory.spaceOrEnter(),
      turnLightSourceOnOrOffDescriptionString
    );

    const hotkeyRow = KeyboardHelpSection.createPlayPauseKeyRow( pauseOrPlayShortcutString, pauseOrPlayShortcutDescriptionString, {
      labelOptions: {
        lineWrap: 150
      }
    } );
    const emitterHelpSection = new KeyboardHelpSection( keyboardHelpDialogObservationWindowString, [ lightSourceRow, hotkeyRow ], {
      labelMaxWidth: 250
    } );

    const generalNavigationHelpSection = new GeneralKeyboardHelpSection( {

      // include information about how to interact with groups (radio buttons in this sim)
      withGroupContent: true
    } );

    super( [ emitterHelpSection ], [ generalNavigationHelpSection ] );
  }
}

moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
export default MoleculesAndLightKeyboardHelpContent;
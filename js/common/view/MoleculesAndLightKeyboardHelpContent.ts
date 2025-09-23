// Copyright 2017-2024, University of Colorado Boulder

/**
 * Content for the "Keyboard Shortcuts" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import MicroScreenView from '../../../../greenhouse-effect/js/micro/view/MicroScreenView.js';
import PlayControlButton from '../../../../scenery-phet/js/buttons/PlayControlButton.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import moleculesAndLight from '../../moleculesAndLight.js';
import MoleculesAndLightStrings from '../../MoleculesAndLightStrings.js';

const keyboardHelpDialogObservationWindowString = MoleculesAndLightStrings.keyboardHelpDialog.observationWindow;
const turnLightSourceOnOrOffString = MoleculesAndLightStrings.keyboardHelpDialog.turnLightSourceOnOrOff;
const turnLightSourceOnOrOffDescriptionString = MoleculesAndLightStrings.a11y.keyboardHelpDialog.turnLightSourceOnOrOffDescription;
const pauseOrPlayShortcutStringProperty = MoleculesAndLightStrings.keyboardHelpDialog.pauseOrPlayShortcutStringProperty;
const pauseOrPlayShortcutDescriptionString = MoleculesAndLightStrings.a11y.keyboardHelpDialog.pauseOrPlayShortcutDescription;
const stepForwardShortcutStringProperty = MoleculesAndLightStrings.keyboardHelpDialog.stepForwardShortcutStringProperty;
const stepForwardShortcutDescriptionString = MoleculesAndLightStrings.a11y.keyboardHelpDialog.stepForwardShortcutDescription;

class MoleculesAndLightKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  constructor() {

    const lightSourceRow = KeyboardHelpSectionRow.labelWithIcon(
      turnLightSourceOnOrOffString,
      KeyboardHelpIconFactory.spaceOrEnter(), {
        labelInnerContent: turnLightSourceOnOrOffDescriptionString
      } );

    const rowOptions = { labelOptions: { lineWrap: 200 } };

    const playPauseRow = KeyboardHelpSectionRow.fromHotkeyData( PlayControlButton.TOGGLE_PLAY_HOTKEY_DATA, {
      labelStringProperty: pauseOrPlayShortcutStringProperty,
      pdomLabelStringProperty: pauseOrPlayShortcutDescriptionString,
      labelWithIconOptions: rowOptions
    } );

    const stepForwardRow = KeyboardHelpSectionRow.fromHotkeyData( MicroScreenView.STEP_FORWARD_HOTKEY_DATA, {
      labelStringProperty: stepForwardShortcutStringProperty,
      pdomLabelStringProperty: stepForwardShortcutDescriptionString,
      labelWithIconOptions: rowOptions
    } );

    const emitterHelpSection = new KeyboardHelpSection( keyboardHelpDialogObservationWindowString, [ lightSourceRow, playPauseRow, stepForwardRow ], {
      textMaxWidth: 250
    } );

    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection();

    super( [ emitterHelpSection ], [ basicActionsHelpSection ] );
  }
}

moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
export default MoleculesAndLightKeyboardHelpContent;
// Copyright 2017-2025, University of Colorado Boulder

/**
 * Content for the "Keyboard Shortcuts" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import MicroScreenView from '../../../../greenhouse-effect/js/micro/view/MicroScreenView.js';
import PhotonEmitterNode from '../../../../greenhouse-effect/js/micro/view/PhotonEmitterNode.js';
import PlayControlButton from '../../../../scenery-phet/js/buttons/PlayControlButton.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import MoleculesAndLightStrings from '../../MoleculesAndLightStrings.js';

const keyboardHelpDialogObservationWindowString = MoleculesAndLightStrings.keyboardHelpDialog.observationWindow;
const pauseOrPlayShortcutStringProperty = MoleculesAndLightStrings.keyboardHelpDialog.pauseOrPlayShortcutStringProperty;
const stepForwardShortcutStringProperty = MoleculesAndLightStrings.keyboardHelpDialog.stepForwardShortcutStringProperty;

class MoleculesAndLightKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {

    const lightSourceRow = KeyboardHelpSectionRow.fromHotkeyData( PhotonEmitterNode.HOTKEY_DATA, {
      labelStringProperty: MoleculesAndLightStrings.keyboardHelpDialog.turnLightSourceOnOrOffStringProperty
    } );

    const rowOptions = { labelOptions: { lineWrap: 200 } };

    const playPauseRow = KeyboardHelpSectionRow.fromHotkeyData( PlayControlButton.TOGGLE_PLAY_HOTKEY_DATA, {
      labelStringProperty: pauseOrPlayShortcutStringProperty,
      labelWithIconOptions: rowOptions
    } );

    const stepForwardRow = KeyboardHelpSectionRow.fromHotkeyData( MicroScreenView.STEP_FORWARD_HOTKEY_DATA, {
      labelStringProperty: stepForwardShortcutStringProperty,
      labelWithIconOptions: rowOptions
    } );

    const emitterHelpSection = new KeyboardHelpSection( keyboardHelpDialogObservationWindowString, [ lightSourceRow, playPauseRow, stepForwardRow ], {
      textMaxWidth: 250
    } );

    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection();

    super( [ emitterHelpSection ], [ basicActionsHelpSection ] );
  }
}

export default MoleculesAndLightKeyboardHelpContent;

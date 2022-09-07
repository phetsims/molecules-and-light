// Copyright 2017-2022, University of Colorado Boulder

/**
 * Content for the "Keyboard Shortcuts" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
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
const pauseOrPlayShortcutString = MoleculesAndLightStrings.keyboardHelpDialog.pauseOrPlayShortcut;
const pauseOrPlayShortcutDescriptionString = MoleculesAndLightStrings.a11y.keyboardHelpDialog.pauseOrPlayShortcutDescription;
const stepForwardShortcutString = MoleculesAndLightStrings.keyboardHelpDialog.stepForwardShortcut;
const stepForwardShortcutDescriptionString = MoleculesAndLightStrings.a11y.keyboardHelpDialog.stepForwardShortcutDescription;

class MoleculesAndLightKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  constructor() {

    const lightSourceRow = KeyboardHelpSectionRow.labelWithIcon(
      turnLightSourceOnOrOffString,
      KeyboardHelpIconFactory.spaceOrEnter(), {
        labelInnerContent: turnLightSourceOnOrOffDescriptionString
      } );

    const rowOptions = { labelOptions: { lineWrap: 200 } };
    const playPauseRow = KeyboardHelpSectionRow.createPlayPauseKeyRow( pauseOrPlayShortcutString, merge( {
      labelInnerContent: pauseOrPlayShortcutDescriptionString
    }, rowOptions ) );
    const stepForwardRow = KeyboardHelpSectionRow.createStepForwardKeyRow( stepForwardShortcutString, merge( {
      labelInnerContent: stepForwardShortcutDescriptionString
    }, rowOptions ) );

    const emitterHelpSection = new KeyboardHelpSection( keyboardHelpDialogObservationWindowString, [ lightSourceRow, playPauseRow, stepForwardRow ], {
      textMaxWidth: 250
    } );

    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection();

    super( [ emitterHelpSection ], [ basicActionsHelpSection ] );
  }
}

moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );
export default MoleculesAndLightKeyboardHelpContent;
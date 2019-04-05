// Copyright 2017-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );

  // strings
  var keyboardHelpDialogLightSourceSliderString = require( 'string!MOLECULES_AND_LIGHT/KeyboardHelpDialog.lightSourceSlider' );

  // constants
  var HELP_SECTION_OPTIONS = {
    labelMaxWidth: 160 // i18n, a bit shorter than default so general and slider sections fits side by side
  };

  /**
   * Constructor.
   *
   * @constructor
   */
  function MoleculesAndLightKeyboardHelpContent( tandem) {

    var sliderHelpSection = new SliderKeyboardHelpSection( _.extend( HELP_SECTION_OPTIONS, {
      headingString: keyboardHelpDialogLightSourceSliderString
    } ) );
    var generalNavigationHelpSection = new GeneralKeyboardHelpSection( _.extend( HELP_SECTION_OPTIONS, {
      withGroupContent: true
    } ) );

    HBox.call( this, {
      children: [ sliderHelpSection, generalNavigationHelpSection ],
      align: 'top',
      spacing: 30,
      tandem: tandem
    } );
  }

  moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );

  return inherit( HBox, MoleculesAndLightKeyboardHelpContent );
} );
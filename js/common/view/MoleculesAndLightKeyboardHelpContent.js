// Copyright 2017-2018, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var SliderControlsHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderControlsHelpContent' );

  // strings
  var keyboardHelpDialogLightSourceSliderString = require( 'string!MOLECULES_AND_LIGHT/KeyboardHelpDialog.lightSourceSlider' );

  // constants
  var HELP_CONTENT_OPTIONS = {
    baseLabelMaxWidth: 160 // i18n, a bit shorter than default so general and slider content fits side by side
  };

  /**
   * Constructor.
   *
   * @constructor
   */
  function MoleculesAndLightKeyboardHelpContent( tandem) {

    var sliderHelpContent = new SliderControlsHelpContent( _.extend( HELP_CONTENT_OPTIONS, {
      headingString: keyboardHelpDialogLightSourceSliderString
    } ) );
    var generalNavigationHelpContent = new GeneralNavigationHelpContent( _.extend( HELP_CONTENT_OPTIONS, {
      withGroupContent: true
    } ) );

    HBox.call( this, {
      children: [ sliderHelpContent, generalNavigationHelpContent ],
      align: 'top',
      spacing: 30,
      tandem: tandem
    } );
  }

  moleculesAndLight.register( 'MoleculesAndLightKeyboardHelpContent', MoleculesAndLightKeyboardHelpContent );

  return inherit( HBox, MoleculesAndLightKeyboardHelpContent );
} );
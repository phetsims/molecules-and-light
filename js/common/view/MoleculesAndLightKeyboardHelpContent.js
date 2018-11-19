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

  /**
   * Constructor.
   *
   * @constructor
   */
  function MoleculesAndLightKeyboardHelpContent( tandem) {

    var sliderHelpContent = new SliderControlsHelpContent( { headingString: keyboardHelpDialogLightSourceSliderString } );
    var generalNavigationHelpContent = new GeneralNavigationHelpContent( { withGroupContent: true } );

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
//  Copyright 2002-2014, University of Colorado Boulder

/**
 * This is a control panel that is intended for use in the play area and that allows the setting of 4 different photon
 * emission frequencies.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // Modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Image = require( 'SCENERY/nodes/Image' );
  var PhotonNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/PhotonNode' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/Photon' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );
  var flashlight2Image = require( 'image!MOLECULES_AND_LIGHT/flashlight2.png' );
  var microwaveTransmitter = require( 'image!MOLECULES_AND_LIGHT/microwave-transmitter.png' );
  var uvLight2 = require( 'image!MOLECULES_AND_LIGHT/uv_light_2.png' );

  // Strings
  var microwaveString = require( 'string!MOLECULES_AND_LIGHT/microwave' );
  var infraredString = require( 'string!MOLECULES_AND_LIGHT/infrared' );
  var visibleString = require( 'string!MOLECULES_AND_LIGHT/visible' );
  var ultravioletString = require( 'string!MOLECULES_AND_LIGHT/ultraviolet' );
  var higherEnergyString = require( 'string!MOLECULES_AND_LIGHT/higherEnergy' );

  // Description data for the 'Energy Arrow'
  var ARROW_LENGTH = 200;
  var ARROW_HEAD_HEIGHT = 15;
  var ARROW_HEAD_WIDTH = 20;
  var ARROW_TAIL_WIDTH = 1;
  var ARROW_COLOR = 'black';

  // Create a layout box which holds a single panel of this control panel.
  function createRadioButtonContent( emitterImage, photonNode ) {
    emitterImage.scale( 0.15 ); // Scale emitter image to fit in the panel, scale factor determined empirically.
    return new LayoutBox( { orientation: 'horizontal', spacing: 10, children: [ emitterImage, photonNode ] } );
  }

  /**
   * Constructor for the control panel of emitted photon frequency.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @constructor
   */
  function QuadEmissionFrequencyControlPanel( photonAbsorptionModel ) {

    // Initialize the photon nodes for the control panel
    var microwavePhotonNode = new PhotonNode( new Photon( WavelengthConstants.MICRO_WAVELENGTH ), new ModelViewTransform2() );
    var infraredPhotonNode = new PhotonNode( new Photon( WavelengthConstants.IR_WAVELENGTH ), new ModelViewTransform2() );
    var visiblePhotonNode = new PhotonNode( new Photon( WavelengthConstants.VISIBLE_WAVELENGTH ), new ModelViewTransform2() );
    var ultravioletPhotonNode = new PhotonNode( new Photon( WavelengthConstants.UV_WAVELENGTH ), new ModelViewTransform2() );

    // Content for radio buttons
    var content = [
      createRadioButtonContent( new Image( microwaveTransmitter ), microwavePhotonNode ),
      createRadioButtonContent( new Image( heatLampImage ), infraredPhotonNode ),
      createRadioButtonContent( new Image( flashlight2Image ), visiblePhotonNode ),
      createRadioButtonContent( new Image( uvLight2 ), ultravioletPhotonNode )
    ];

    // Load the wavelengths and labels into arrays for initializing radio button content.
    var wavelengths = [ WavelengthConstants.MICRO_WAVELENGTH, WavelengthConstants.IR_WAVELENGTH,
      WavelengthConstants.VISIBLE_WAVELENGTH, WavelengthConstants.UV_WAVELENGTH ];

    var font = new PhetFont( { size: 18, family: 'Sans-serif' } );
    var labels = [ microwaveString, infraredString, visibleString, ultravioletString ];

    var radioButtonContent = [];
    for ( var i = 0; i < wavelengths.length; i++ ) {
      radioButtonContent.push( { value: wavelengths[i], node: content[i], label: new Text( labels[i], { font: font } ) } );
    }

    var radioButtons = new RadioButtonGroup( photonAbsorptionModel.photonWavelengthProperty, radioButtonContent,
      {
        orientation: 'horizontal',
        spacing: 15,
        baseColor: 'black',
        selectedStroke: 'rgb(47, 101,209)',
        deselectedLineWidth: 0,
        buttonContentXMargin: 0,
        buttonContentYMargin: 8,
        selectedLineWidth: 3,
        cornerRadius: 7
      } );

    // Scale the radio button text.  This is done mostly to support translations.
    // Determine the max width of panels in the radio button group.
    var panelWidth = _.max( radioButtonContent, function( content ) { return content.node.width; } ).node.width;
    // Calculate the minimum scale factor that must be applied to each label. Ensures constant font size for all labels.
    var scaleFactor = 1;
    _.each( radioButtonContent, function( content ) {
      var labelWidth = content.label.width;
      scaleFactor = Math.min( scaleFactor, panelWidth / labelWidth );
    } );
    // If necessary, scale down each label by the minimum scale value.
    if ( scaleFactor < 1 ) {
      _.each( radioButtonContent, function( content ) {
        content.label.scale( scaleFactor );
      } );
    }

    // Place radioButtons into a panel.
    Panel.call( this, radioButtons, { fill: '#C5D6E8', stroke: null } );

    // Draw an arrow node to illustrate energy of the emitted photons.
    var energyFont = new PhetFont( { family: 'Futura', size: 19} ); // font for energy description
    var energyText = new Text( higherEnergyString, { font: energyFont } );
    var energyArrow = new ArrowNode( 0, 0, ARROW_LENGTH, 0, {
      fill: ARROW_COLOR,
      stroke: ARROW_COLOR,
      headHeight: ARROW_HEAD_HEIGHT,
      headWidth: ARROW_HEAD_WIDTH,
      tailWidth: ARROW_TAIL_WIDTH } );

    // Scale the text below the arrow node. Max text length is the arrow tail length minus twice the head width.
    if ( energyText.width > ARROW_LENGTH - 2 * ARROW_HEAD_WIDTH ) {
      energyText.scale( (ARROW_LENGTH - 2 * ARROW_HEAD_WIDTH ) / energyText.width );
    }

    energyArrow.center = ( new Vector2( this.centerX, this.centerY + 60 ) );
    energyText.center = ( new Vector2( energyArrow.centerX, energyArrow.centerY + 17 ) );

    this.addChild( energyArrow );
    this.addChild( energyText );
  }

  return inherit( Panel, QuadEmissionFrequencyControlPanel );
} );
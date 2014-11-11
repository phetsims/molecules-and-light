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
  var Color = require( 'SCENERY/util/Color' );
  var Vector2 = require( 'DOT/Vector2' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var PhotonEmitterSelectorPanel = require( 'MOLECULES_AND_LIGHT/view/PhotonEmitterSelectorPanel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Image = require( 'SCENERY/nodes/Image' );
  var PAPhotonNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/PAPhotonNode' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/Photon' );

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
  var ARROW_COLOR = Color.BLACK;

  /**
   * Constructor for the control panel of emitted photon frequency.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @constructor
   */
  function QuadEmissionFrequencyControlPanel( photonAbsorptionModel ) {

    // Initialize the photon nodes for the control panel
    var microwavePhotonNode = new PAPhotonNode( new Photon( WavelengthConstants.MICRO_WAVELENGTH ), new ModelViewTransform2() );
    var infraredPhotonNode = new PAPhotonNode( new Photon( WavelengthConstants.IR_WAVELENGTH ), new ModelViewTransform2() );
    var visiblePhotonNode = new PAPhotonNode( new Photon( WavelengthConstants.VISIBLE_WAVELENGTH ), new ModelViewTransform2() );
    var ultravioletPhotonNode = new PAPhotonNode( new Photon( WavelengthConstants.UV_WAVELENGTH ), new ModelViewTransform2() );

    // Include all contents of the control panel.
    var content = [
      new PhotonEmitterSelectorPanel( new Image( microwaveTransmitter ), microwavePhotonNode ),
      new PhotonEmitterSelectorPanel( new Image( heatLampImage ), infraredPhotonNode ),
      new PhotonEmitterSelectorPanel( new Image( flashlight2Image ), visiblePhotonNode ),
      new PhotonEmitterSelectorPanel( new Image( uvLight2 ), ultravioletPhotonNode )
    ];

    // Load the wavelengths into an array for the radio button content.
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
        selectedStroke: new Color( 47, 101, 209 ),
        deselectedLineWidth: 0,
        buttonContentXMargin: 0,
        buttonContentYMargin: 8,
        selectedLineWidth: 3,
        cornerRadius: 7
      } );

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
    energyArrow.setCenter( new Vector2( this.getCenterX(), this.getCenterY() + 60 ) );
    energyText.setCenter( new Vector2( energyArrow.getCenterX(), energyArrow.getCenterY() + 15 ) );

    this.addChild( energyArrow );
    this.addChild( energyText );
  }

  return inherit( Panel, QuadEmissionFrequencyControlPanel );
} );
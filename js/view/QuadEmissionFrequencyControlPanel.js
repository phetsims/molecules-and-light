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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Property = require( 'AXON/Property' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector2 = require( 'DOT/Vector2' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var PhotonEmitterSelectorPanel = require( 'MOLECULES_AND_LIGHT/view/PhotonEmitterSelectorPanel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Image = require( 'SCENERY/nodes/Image' );
  var PAPhotonNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PAPhotonNode' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Photon' );

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

  // Model data for the Control Panel
  var BACKGROUND_COLOR = new Color( 185, 178, 95 );
  var PANEL_SIZE = new Dimension2( 850, 150 );

  // Description data for the 'Energy Arrow'
  var ARROW_LENGTH = 250;
  var ARROW_HEAD_HEIGHT = 15;
  var ARROW_HEAD_WIDTH = 15;
  var ARROW_TAIL_WIDTH = 2;
  var ARROW_COLOR = Color.BLACK;

  /**
   * Constructor for the control panel of emitted photon frequency.
   *
   * @param { PhotonAbsorptionModel } photonAbsorptionModel
   * @param options
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
      new PhotonEmitterSelectorPanel( microwaveString, new Image( microwaveTransmitter ), microwavePhotonNode ),
      new PhotonEmitterSelectorPanel( infraredString, new Image( heatLampImage ), infraredPhotonNode ),
      new PhotonEmitterSelectorPanel( visibleString, new Image( flashlight2Image ), visiblePhotonNode ),
      new PhotonEmitterSelectorPanel( ultravioletString, new Image( uvLight2 ), ultravioletPhotonNode )
    ];

    // Load the wavelengths into an array for the radio button content.
    var wavelengths = [ WavelengthConstants.MICRO_WAVELENGTH, WavelengthConstants.IR_WAVELENGTH,
      WavelengthConstants.VISIBLE_WAVELENGTH, WavelengthConstants.UV_WAVELENGTH ];

    var radioButtonContent = [];
    for ( var i = 0; i < wavelengths.length; i++ ) {
      radioButtonContent.push( { value: wavelengths[i], node: content[i] } );
    }

    var radioButtons = new RadioButtonGroup( photonAbsorptionModel.photonWavelengthProperty, radioButtonContent,
      {
        alignVertically: false,
        spacing: 15,
        selectedStroke: new Color( 47, 101, 209 ),
        deselectedLineWidth: 0,
        buttonContentXMargin: 0,
        selectedLineWidth: 3,
        cornerRadius: 7
      } );

    Panel.call( this, radioButtons );

//    model.photonTargetProperty.link( function() {
//      model.setPhotonTarget( model.photonTargetProperty.get() );
//    });

  }

  return inherit( Panel, QuadEmissionFrequencyControlPanel );

} );




//    options = _.extend( {
//      stroke: null,
//      fill: BACKGROUND_COLOR,
//      lineWidth: 3
//    }, options );
//
//    var wavelengthFont = new PhetFont( { family: 'Futura', size: 24, weight: '500' } );
//    var energyFont = new PhetFont( { family: 'Futura', size: 19, weight: 'bold'} );
//
//    // Declare the radio buttons
//    var microwaveSelectorNode = new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.MICRO_WAVELENGTH,
//      new Text( microwaveString, { font: wavelengthFont } ), { scale: 0.75 } );
//    var infraredSelectorNode = new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.IR_WAVELENGTH,
//      new Text( infraredString, { font: wavelengthFont } ), {scale: 0.75 } );
//    var visibleLightSelectorNode = new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.VISIBLE_WAVELENGTH,
//      new Text( visibleString, {font: wavelengthFont } ), {scale: 0.75 } );
//    var ultravioletSelectorNode = new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.UV_WAVELENGTH,
//      new Text( ultravioletString, { font: wavelengthFont } ), { scale: 0.75 } );
//
//
//
//    // Determine the correct spacing between the nodes on this panel.
//    var interSelectorSpacing = ( PANEL_SIZE.width - microwaveSelectorNode.getBounds().width -
//                                 infraredSelectorNode.getBounds().width -
//                                 visibleLightSelectorNode.getBounds().width -
//                                 ultravioletSelectorNode.getBounds().width ) / 5;
//
//    // Set up the radio buttons and photonNodes so that they are centered together on the control panel.
//    var microwaveBox = new VBox( {children: [ microwavePhotonNode, microwaveSelectorNode ] } );
//    var infraredBox = new VBox( {children: [ infraredPhotonNode, infraredSelectorNode] } );
//    var visibleBox = new VBox( {children: [ visiblePhotonNode, visibleLightSelectorNode ] } );
//    var ultravioletBox = new VBox( {children: [ ultravioletPhotonNode, ultravioletSelectorNode ] } );
//
//    var wavelengthSelectorPanelNode = new HBox( {children: [
//      microwaveBox,
//      infraredBox,
//      visibleBox,
//      ultravioletBox
//    ], spacing: interSelectorSpacing } );
//
//    // Create the energy arrow and associated text.
//    var energyArrow = new ArrowNode( 0, 0, ARROW_LENGTH, 0, {
//      fill: ARROW_COLOR,
//      stroke: ARROW_COLOR,
//      headHeight: ARROW_HEAD_HEIGHT,
//      headWidth: ARROW_HEAD_WIDTH,
//      tailWidth: ARROW_TAIL_WIDTH } );
//    var energyText = new Text( higherEnergyString, { font: energyFont } );
//
//    // Include all contents of the control panel.
//    var content = new VBox( {align: 'center', spacing: 20, children: [ wavelengthSelectorPanelNode, energyArrow, energyText ] } );
//
//    Panel.call( this, content, options );
//  }
//
//  return inherit( Panel, QuadEmissionFrequencyControlPanel );

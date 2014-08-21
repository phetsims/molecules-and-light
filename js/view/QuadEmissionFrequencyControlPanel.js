//  Copyright 2002-2014, University of Colorado Boulder

/**
 * This is a control panel that is intended for use in the play area and
 * that allows the setting of 4 different photon emission frequencies.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
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

  // Model data for the Control Panel
  var BACKGROUND_COLOR = new Color( 185, 178, 95 );
  var PANEL_SIZE = new Dimension2( 850, 150 );


  function QuadEmissionFrequencyControlPanel( photonAbsorptionModel, options ) {

    //    // Create the main background shape.
//    final PNode backgroundNode = new PhetPPath( new RoundRectangle2D.Double(0, 0, PANEL_SIZE.getWidth(),
//      PANEL_SIZE.getHeight(), 20, 20), BACKGROUND_COLOR );

    options = _.extend( {
        stroke: null,
        fill: BACKGROUND_COLOR,
        lineWidth: 3
      }, options );

    var radioButtonHBox = new HBox( {children: [
      new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.MICRO_WAVELENGTH, new Text( 'Microwave' ) ),
      new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.IR_WAVELENGTH, new Text( 'Infrared' ) ),
      new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.VISIBLE_WAVELENGTH, new Text( 'Visible' ) ),
      new AquaRadioButton( photonAbsorptionModel.photonWavelengthProperty, WavelengthConstants.UV_WAVELENGTH, new Text( 'Ultraviolet' ) )
    ], spacing: 5
    } );
    var higherEnergyNode = new Text( 'higherEnergyNode' );
    // The contents of the control panel
    var content = new VBox( {align: 'center', spacing: 10, children: [radioButtonHBox, higherEnergyNode] } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, QuadEmissionFrequencyControlPanel );
} );


//  // ------------------------------------------------------------------------
//  // Constructor(s)
//  // ------------------------------------------------------------------------
//
//  public QuadEmissionFrequencyControlPanel( final PhotonAbsorptionModel model ){
//
//
//
//    // Add the radio buttons that set the emission wavelength.
//    final WavelengthSelectButtonNode microwaveSelectorNode =
//                                     new WavelengthSelectButtonNode( MoleculesAndLightResources.getString( "QuadWavelengthSelector.Microwave" ), model, WavelengthConstants.MICRO_WAVELENGTH );
//    final WavelengthSelectButtonNode infraredSelectorNode =
//                                     new WavelengthSelectButtonNode( MoleculesAndLightResources.getString( "QuadWavelengthSelector.Infrared" ), model, WavelengthConstants.IR_WAVELENGTH );
//    final WavelengthSelectButtonNode visibleLightSelectorNode =
//                                     new WavelengthSelectButtonNode( MoleculesAndLightResources.getString( "QuadWavelengthSelector.Visible" ), model, WavelengthConstants.VISIBLE_WAVELENGTH );
//    final WavelengthSelectButtonNode ultravioletSelectorNode =
//                                     new WavelengthSelectButtonNode( MoleculesAndLightResources.getString( "QuadWavelengthSelector.Ultraviolet" ), model, WavelengthConstants.UV_WAVELENGTH );

//    // Put all the buttons into a button group.  Without this, for some
//    // reason, the individual buttons will toggle to the off state if
//    // pressed twice in a row.
//    ButtonGroup buttonGroup = new ButtonGroup();
//    buttonGroup.add( microwaveSelectorNode.getButton() );
//    buttonGroup.add( infraredSelectorNode.getButton() );
//    buttonGroup.add( visibleLightSelectorNode.getButton() );
//    buttonGroup.add( ultravioletSelectorNode.getButton() );
//
//    // Create a "panel" sort of node that contains all the selector
//    // buttons, then position it on the main node.
//    final PNode wavelengthSelectorPanelNode = new PNode();
//    double interSelectorSpacing = ( PANEL_SIZE.getWidth() - microwaveSelectorNode.getFullBoundsReference().width -
//                                    infraredSelectorNode.getFullBoundsReference().width -
//                                    visibleLightSelectorNode.getFullBoundsReference().width -
//                                    ultravioletSelectorNode.getFullBoundsReference().width ) / 5;
//    interSelectorSpacing = Math.max( interSelectorSpacing, 0 ); // Don't allow less than 0.
//    microwaveSelectorNode.setOffset( interSelectorSpacing, 0 );
//    wavelengthSelectorPanelNode.addChild( microwaveSelectorNode );
//    infraredSelectorNode.setOffset( microwaveSelectorNode.getFullBoundsReference().getMaxX() + interSelectorSpacing, 0 );
//    wavelengthSelectorPanelNode.addChild( infraredSelectorNode );
//    visibleLightSelectorNode.setOffset(  infraredSelectorNode.getFullBoundsReference().getMaxX() + interSelectorSpacing, 0 );
//    wavelengthSelectorPanelNode.addChild( visibleLightSelectorNode );
//    ultravioletSelectorNode.setOffset( visibleLightSelectorNode.getFullBoundsReference().getMaxX() + interSelectorSpacing, 0 );
//    wavelengthSelectorPanelNode.addChild( ultravioletSelectorNode );
//    wavelengthSelectorPanelNode.setOffset( 0, 10 );
//
//
//    // Add the energy arrow.
//    EnergyArrow energyArrow = new EnergyArrow( MoleculesAndLightResources.getString( "QuadWavelengthSelector.HigherEnergy" ), model ){{
//      centerFullBoundsOnPoint( backgroundNode.getFullBoundsReference().getCenterX(),
//          PANEL_SIZE.getHeight() - getFullBoundsReference().height / 2 - 10 );
//    }};
//    backgroundNode.addChild( energyArrow );
//
//    // Add everything in the needed order.
//    addChild( backgroundNode );
//    backgroundNode.addChild( wavelengthSelectorPanelNode );
//  }
//
//  // ------------------------------------------------------------------------
//  // Inner Classes and Interfaces
//  //------------------------------------------------------------------------
//
//  /**
//   * Convenience class that puts a radio button with a caption into a PNode.
//   */
//  private static class WavelengthSelectButtonNode extends PNode {
//
//    private static final Font LABEL_FONT  = new PhetFont( 16 );
//    JRadioButton button;
//
//    public WavelengthSelectButtonNode( final String text, final PhotonAbsorptionModel photonAbsorptionModel, final double wavelength ){
//
//      // Add the radio button.
//      button = new JRadioButton(){{
//        setFont( LABEL_FONT );
//        setText( text );
//        setBackground( BACKGROUND_COLOR );
//        setOpaque( false );
//        addActionListener( new ActionListener() {
//          public void actionPerformed( ActionEvent e ) {
//            photonAbsorptionModel.setEmittedPhotonWavelength( wavelength );
//          }
//        });
//        photonAbsorptionModel.addListener( new PhotonAbsorptionModel.Adapter() {
//          @Override
//          public void emittedPhotonWavelengthChanged() {
//            setSelected( photonAbsorptionModel.getEmittedPhotonWavelength() == wavelength );
//          }
//        } );
//        // Set initial state.
//        setSelected( photonAbsorptionModel.getEmittedPhotonWavelength() == wavelength );
//      }};
//
//      // We received some feedback that the buttons were a little small,
//      // so the following scaling operation makes them bigger relative
//      // to the font.
//      PSwing buttonNode = new PSwing( button ){{
//        setScale( 1.5 );
//      }};
//      addChild( buttonNode );
//
//      // Add an image of a photon.
//      PAPhotonNode photonNode = new PAPhotonNode( wavelength );
//      photonNode.addInputEventListener( new PBasicInputEventHandler(){
//        @Override
//        public void mouseClicked( PInputEvent event ) {
//          photonAbsorptionModel.setEmittedPhotonWavelength( wavelength );
//        }
//      });
//      addChild( photonNode );
//
//      // Do the layout.  The photon is above the radio button, centered.
//      photonNode.setOffset(
//          buttonNode.getFullBoundsReference().width / 2,
//          photonNode.getFullBoundsReference().height / 2 );
//      buttonNode.setOffset( 0, photonNode.getFullBoundsReference().height * 0.6 );
//
//    }
//
//    public JRadioButton getButton(){
//      return button;
//    }
//  }
//
//  /**
//   * Class that defines the "energy arrow", which is an arrow that depicts
//   * the direction of increasing energy.
//   */
//  private static class EnergyArrow extends PNode {
//
//    private static final double ARROW_LENGTH = 250;
//    private static final double ARROW_HEAD_HEIGHT = 15;
//    private static final double ARROW_HEAD_WIDTH = 15;
//    private static final double ARROW_TAIL_WIDTH = 2;
//    private static final Paint ARROW_COLOR = Color.BLACK;
//
//    public EnergyArrow( String captionText, final PhotonAbsorptionModel model ){
//      // Create and add the arrow.  The arrow points to the right.
//      Point2D headPoint, tailPoint;
//      headPoint = new Point2D.Double(ARROW_LENGTH, 0);
//      tailPoint = new Point2D.Double(0, 0);
//      final ArrowNode arrowNode = new ArrowNode( tailPoint, headPoint, ARROW_HEAD_HEIGHT, ARROW_HEAD_WIDTH, ARROW_TAIL_WIDTH ){{
//        setPaint( ARROW_COLOR );
//        setStroke( new BasicStroke( 3 ) );
//      }};
//      addChild( arrowNode );
//
//      // Create and add the caption.
//      HTMLNode caption = new HTMLNode( captionText );
//      caption.setFont( new PhetFont( 20, true ) );
//      caption.setOffset(
//          arrowNode.getFullBoundsReference().getCenterX() - caption.getFullBoundsReference().width / 2,
//        arrowNode.getFullBoundsReference().getMaxY());
//      addChild( caption );
//    }
//  }
//}

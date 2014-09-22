//  Copyright 2002-2014, University of Colorado Boulder

/**
 * View for Molecules and Light
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco
 *
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var PAPhotonNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PAPhotonNode' );
  var PhotonEmitterNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PhotonEmitterNode' );
  var QuadEmissionFrequencyControlPanel = require( 'MOLECULES_AND_LIGHT/view/QuadEmissionFrequencyControlPanel' );
  var CO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO' );
  var NO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO' );
  var NO2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO2' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/MoleculeNode' );
  var VerticalRodNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/VerticalRodNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Color = require( 'SCENERY/util/Color' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var MoleculesAndLightControlPanel = require( 'MOLECULES_AND_LIGHT/view/MoleculesAndLightControlPanel' );
  var MoleculesAndLightApplicationWindow = require( 'MOLECULES_AND_LIGHT/view/MoleculesAndLightApplicationWindow' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Rectangle = require( 'DOT/Rectangle' );

  // Strings
  var buttonCaptionString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.buttonCaption' );
  var returnMoleculeString = require( 'string!MOLECULES_AND_LIGHT/buttonNode.returnMolecule' );

  // Class data for the Molecules and Light screen view
  // Model-view transform for intermediate coordinates.
  var INTERMEDIATE_RENDERING_SIZE = new Dimension2( 500, 300 );
  var PHOTON_EMITTER_WIDTH = 220;

  /**
   * Constructor for the screen view of Molecules and Light.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel ) {

    var moleculesAndLightScreenView = this;
    ScreenView.call( this, { renderer: 'svg' } );

    var thisScreenView = this;
    this.photonAbsorptionModel = photonAbsorptionModel;

    this.mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Math.round( INTERMEDIATE_RENDERING_SIZE.width * 0.55 ),
        Math.round( INTERMEDIATE_RENDERING_SIZE.height * 0.50 ) ),
      0.18 ); // Scale factor - Smaller number zooms out, bigger number zooms in.

    // Create the node that will be the root for all the world children on this canvas.  This is done to make it easier
    // to zoom in and out on the world without affecting screen children.
    this.myWorldNode = new Node();
    this.addChild( this.myWorldNode );

    // Create the application window.  This will hold all photons, molecules, and photonEmitters for this photon
    // absorption model.
    this.applicationWindow = new MoleculesAndLightApplicationWindow( photonAbsorptionModel, this.mvt );
    this.myWorldNode.addChild( this.applicationWindow );
    this.applicationWindow.setLeftTop( new Vector2( 15, 15 ) );

    // Create the control panel for photon emission frequency.
    var photonEmissionControlPanel = new QuadEmissionFrequencyControlPanel( photonAbsorptionModel );
    photonEmissionControlPanel.setLeftTop( new Vector2( 15, 350 ) );

    // Create the molecule control panel
    var moleculeControlPanel = new MoleculesAndLightControlPanel( photonAbsorptionModel );
    moleculeControlPanel.scale( .75 );
    moleculeControlPanel.setLeftTop( new Vector2( 530, 15 ) );

    // Add reset all button.
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { photonAbsorptionModel.reset(); },
        bottom: this.layoutBounds.bottom - 15,
        right: this.layoutBounds.right - 15,
        radius: 18
      } );

    this.addChild( resetAllButton );

    // Add play/pause button.
    var playPauseButton = new PlayPauseButton( photonAbsorptionModel.playProperty,
      {
        bottom: moleculeControlPanel.bottom + 60,
        centerX: moleculeControlPanel.centerX - 25,
        radius: 23
      } );

    this.addChild( playPauseButton );

    // Add step button to manually step the animation.
    var stepButton = new StepButton( function() { photonAbsorptionModel.manualStep(); }, photonAbsorptionModel.playProperty,
      {
        centerY: playPauseButton.centerY,
        centerX: moleculeControlPanel.centerX + 25,
        radius: 15
      } );

    this.addChild( stepButton );

//  // Button for displaying EM specturm.
//  private final HTMLImageButtonNode showSpectrumButton = new HTMLImageButtonNode( MoleculesAndLightResources.getString( "SpectrumWindow.buttonCaption" ), new PhetFont( Font.BOLD, 24 ), new Color( 185, 178, 95 ) );
//    var showSpectrumButton = new TextPushButton( buttonCaptionString, { fill: Color.RED } );

//  // Window that displays the EM spectrum upon request.
//  private final SpectrumWindow spectrumWindow = new SpectrumWindow() {{ setVisible( false ); }};
//


    // Add the nodes in the order necessary for correct layering.
    this.myWorldNode.addChild( photonEmissionControlPanel );
    this.myWorldNode.addChild( moleculeControlPanel );
  }

  return inherit( ScreenView, MoleculesAndLightScreenView );

} );


//  //----------------------------------------------------------------------------
//  // Constructors
//  //----------------------------------------------------------------------------
//
//    // Add the button for displaying the EM spectrum.
//    myWorldNode.addChild( showSpectrumButton );
//    showSpectrumButton.setOffset( 0, 700 );
//    showSpectrumButton.addActionListener( new ActionListener() {
//      public void actionPerformed( ActionEvent event ) {
//        // If the spectrum window is currently invisible
//        // maximized, un-maximize it.
//        if ( !spectrumWindow.isVisible() && ( spectrumWindow.getExtendedState() & Frame.MAXIMIZED_BOTH ) == Frame.MAXIMIZED_BOTH ) {
//          spectrumWindow.setExtendedState( spectrumWindow.getExtendedState() & ~Frame.MAXIMIZED_BOTH );
//        }
//        // If the spectrum window is currently minimized, restore it.
//        if ( spectrumWindow.getState() == Frame.ICONIFIED ) {
//          spectrumWindow.setState( Frame.NORMAL );
//        }
//
//        // Always set it visible.  This has the effect of bringing it
//        // to the front if it is behind the main sim window.
//        spectrumWindow.setVisible( true );
//      }
//    } );
//
//    // Update the layout.
//    updateLayout();
//  }
//
//  //----------------------------------------------------------------------------
//  // Methods
//  //----------------------------------------------------------------------------
//
//
//
//  }
//


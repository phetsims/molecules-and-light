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
  var MoleculesAndLightControlPanel = require( 'MOLECULES_AND_LIGHT/view/MoleculesAndLightControlPanel' );
  var MoleculesAndLightApplicationWindow = require( 'MOLECULES_AND_LIGHT/view/MoleculesAndLightApplicationWindow' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  // Strings
  var buttonCaptionString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.buttonCaption' );

  // Class data for the Molecules and Light screen view
  // Model-view transform for intermediate coordinates.
  var INTERMEDIATE_RENDERING_SIZE = new Dimension2( 786, 786 );
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

    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Math.round( INTERMEDIATE_RENDERING_SIZE.width * 0.65 ),
        Math.round( INTERMEDIATE_RENDERING_SIZE.height * 0.35 ) ),
        0.18 ); // Scale factor - Smaller number zooms out, bigger number zooms in.

    // Create the node that will be the root for all the world children on
    // this canvas.  This is done to make it easier to zoom in and out on
    // the world without affecting screen children.
    this.myWorldNode = new Node();
    this.addChild( this.myWorldNode );

    // Create the application window.  This will hold all photons, molecules, and photonEmitters for this photon
    // absorption model.
    var applicationWindow = new MoleculesAndLightApplicationWindow( photonAbsorptionModel, mvt );
    this.myWorldNode.addChild( applicationWindow );
    applicationWindow.setLeftTop( new Vector2( 15, 15 ) );

    // Create the control panel for photon emission frequency.
    var photonEmissionControlPanel = new QuadEmissionFrequencyControlPanel( photonAbsorptionModel );
    photonEmissionControlPanel.setLeftTop( new Vector2( 15, 350 ) );

    // Add reset all button
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { photonAbsorptionModel.reset(); },
        bottom: this.layoutBounds.bottom - 5,
        right: this.layoutBounds.right - 30,
        radius: 18
      } );

    this.addChild( resetAllButton );

//  // Data structures that match model objects to their representations in
//  // the view.
//  private final HashMap<Photon, PAPhotonNode> photonMap = new HashMap<Photon, PAPhotonNode>();
//  private final HashMap<Molecule, MoleculeNode> moleculeMap = new HashMap<Molecule, MoleculeNode>();

//  // Listener for watching molecules and updating the restore button
//  // visibility.
//  private final Molecule.Adapter moleculeMotionListener = new Molecule.Adapter() {
//    @Override
//    public void centerOfGravityPosChanged( Molecule molecule ) {
//      updateRestoreMolecueButtonVisibility();
//    }
//  };
//
//  // Button for displaying EM specturm.
//  private final HTMLImageButtonNode showSpectrumButton = new HTMLImageButtonNode( MoleculesAndLightResources.getString( "SpectrumWindow.buttonCaption" ), new PhetFont( Font.BOLD, 24 ), new Color( 185, 178, 95 ) );
//    var showSpectrumButton = new TextPushButton( buttonCaptionString, { fill: Color.RED } );

//  // Window that displays the EM spectrum upon request.
//  private final SpectrumWindow spectrumWindow = new SpectrumWindow() {{ setVisible( false ); }};
//


//    Declare the control panel for molecule type
    var moleculeControlPanel = new MoleculesAndLightControlPanel( photonAbsorptionModel );
    moleculeControlPanel.scale(.75);
    moleculeControlPanel.setLeftTop( new Vector2( 530, 15 ) );

    // Add the nodes in the order necessary for correct layering.
    this.myWorldNode.addChild( photonEmissionControlPanel );
    this.myWorldNode.addChild( moleculeControlPanel );
  }

  return inherit( ScreenView, MoleculesAndLightScreenView );

} );


//  //----------------------------------------------------------------------------
//  // Constructors
//  //----------------------------------------------------------------------------
//    // Add the button for restoring molecules that break apart.
//    restoreMoleculeButtonNode = new HTMLImageButtonNode( MoleculesAndLightResources.getString( "ButtonNode.ReturnMolecule" ), new PhetFont( Font.BOLD, 24 ), new Color( 255, 144, 0 ) );
//    restoreMoleculeButtonNode.setOffset( INTERMEDIATE_RENDERING_SIZE.width - restoreMoleculeButtonNode.getFullBounds().getWidth(), 50 );
//    restoreMoleculeButtonNode.addActionListener( new ActionListener() {
//      public void actionPerformed( ActionEvent e ) {
//        photonAbsorptionModel.restorePhotonTarget();
//      }
//    } );
//    myWorldNode.addChild( restoreMoleculeButtonNode );
//    updateRestoreMolecueButtonVisibility();
//


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
//  /**
//   * Update the visibility of the button that restores molecules that have
//   * broken apart.  This button should be visible only when one or more
//   * molecules are off the screen (more or less).  This routine uses the
//   * intermediate rendering size to make the determination, which isn't
//   * perfectly accurate, but works well enough for our purposes.
//   */
//  private void updateRestoreMolecueButtonVisibility() {
//    boolean restoreButtonVisible = false;
//    Rectangle2D screenRect = new Rectangle2D.Double( 0, 0, INTERMEDIATE_RENDERING_SIZE.width, INTERMEDIATE_RENDERING_SIZE.height );
//    for ( Molecule molecule : photonAbsorptionModel.getMolecules() ) {
//      if ( !screenRect.contains( mvt.modelToView( molecule.getCenterOfGravityPos() ) ) ) {
//        restoreButtonVisible = true;
//        break;
//      }
//    }
//    restoreMoleculeButtonNode.setVisible( restoreButtonVisible );
//  }
//}

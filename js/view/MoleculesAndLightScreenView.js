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

  // Strings
  var buttonCaptionString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.buttonCaption' );

  // Class data for the Molecules and Light screen view
  // Model-view transform for intermediate coordinates.
  var INTERMEDIATE_RENDERING_SIZE = new Dimension2( 786, 786 );
  var PHOTON_EMITTER_WIDTH = 300;


  /**
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel ) {
    var moleculesAndLightScreenView = this;
    ScreenView.call( this );

    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Math.round( 786 * 0.65 ), Math.round( 786 * 0.35 ) ),
      0.18 );

    this.mvt = mvt; // Make mvt available to descendant types.

    photonAbsorptionModel.photons.addItemAddedListener( function( photon ) {
      moleculesAndLightScreenView.addChild( new PAPhotonNode( photon, mvt ) );

    } );

//  // Data structures that match model objects to their representations in
//  // the view.
    // TODO: I am not sure if I will need these yet.  The hashmap equivalent for javascript has been
    // TODO: an object with keys and values but the key cannot be an object.  For this structure to
    // TODO: work I will probably need to implement uniqueID's for each object which will be linked
    // TODO: the proper node and then hashmaps from the unique ID back to the original object.
    // TODO: This reuires a total of 4 hashmaps.
//  private final HashMap<Photon, PAPhotonNode> photonMap = new HashMap<Photon, PAPhotonNode>();
//  private final HashMap<Molecule, MoleculeNode> moleculeMap = new HashMap<Molecule, MoleculeNode>();

//  // Listener for watching molecules and updating the restore button
//  // visibility.  TODO: I will use a property such as brokenUpProperty to determine whether the button should be seen.
//  private final Molecule.Adapter moleculeMotionListener = new Molecule.Adapter() {
//    @Override
//    public void centerOfGravityPosChanged( Molecule molecule ) {
//      updateRestoreMolecueButtonVisibility();
//    }
//  };
//
//  // Button for displaying EM specturm.
//  private final HTMLImageButtonNode showSpectrumButton = new HTMLImageButtonNode( MoleculesAndLightResources.getString( "SpectrumWindow.buttonCaption" ), new PhetFont( Font.BOLD, 24 ), new Color( 185, 178, 95 ) );
    var showSpectrumButton = new TextPushButton( buttonCaptionString, { fill: Color.RED } );

//  // Window that displays the EM spectrum upon request.
//  private final SpectrumWindow spectrumWindow = new SpectrumWindow() {{ setVisible( false ); }};
//

    // Add the heat lamp to the left center of screen
    // TODO: Width and location will be set later when we do an official port of MoleculesAndLightCanvas.java
    var photonEmitterNode = new PhotonEmitterNode( 300, this.mvt, photonAbsorptionModel );

    photonEmitterNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );

    // Add the control panel for photon type
    var photonEmissionControlPanel = new QuadEmissionFrequencyControlPanel( photonAbsorptionModel, {top: photonEmitterNode.bottom + 100, left: 20} );

//    // Declare the control panel for molecule type
//    var moleculeControlPanel = new MoleculesAndLightControlPanel( photonAbsorptionModel );
//    moleculeControlPanel.setCenter( new Vector2(700, 400 ) );

    // Create the rod that connects the emitter to the control panel.
    var connectingRod = new VerticalRodNode( 30,
      Math.abs( photonEmitterNode.getCenter().y - photonEmissionControlPanel.getCenter().y ),
      new Color( 205, 198, 115 ) );

    connectingRod.setCenter( new Vector2(
        photonEmitterNode.getCenter().x - connectingRod.getBounds().width / 2,
        photonEmitterNode.getCenter().y + connectingRod.getCenter().y ) );

    this.addChild( connectingRod );
    this.addChild( photonEmissionControlPanel );
    this.addChild( photonEmitterNode );
    this.addChild( showSpectrumButton );
    //this.addChild( moleculeControlPanel );

    // Add a molecule to the screen.
    this.addChild( new MoleculeNode( new NO2( { initialCenterOfGravityPos: new Vector2( 50, 50 ) } ), mvt ) );


  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );


//  //----------------------------------------------------------------------------
//  // Constructors
//  //----------------------------------------------------------------------------
//
//  /**
//   * Constructor.
//   *
//   * @param parentFrame           TODO
//   * @param photonAbsorptionModel - Model that is being portrayed on this canvas.
//   */
//  public MoleculesAndLightCanvas( final Frame parentFrame, final MoleculesAndLightModule module, final PhotonAbsorptionModel photonAbsorptionModel ) {
//
//    this.photonAbsorptionModel = photonAbsorptionModel;
//
//    // Monitor the property that the user can use (through the options
//    // menu) to force the background to be white.
//    module.getWhiteBackgroundProperty().addObserver( new SimpleObserver() {
//      public void update() {
//        setBackground( module.getWhiteBackgroundProperty().get() ? Color.white : Color.black );
//      }
//    } );
//
//    // Set up the canvas-screen transform.
//    setWorldTransformStrategy( new CenteringBoxStrategy( this, INTERMEDIATE_RENDERING_SIZE ) );
//
//    // Set up the model-canvas transform.  The multiplier values below can
//    // be used to shift the center of the play area right or left, and the
//    // scale factor can be used to essentially zoom in or out.
//    mvt = new ModelViewTransform2D(
//      new Point2D.Double( 0, 0 ),
//      new Point( (int) Math.round( INTERMEDIATE_RENDERING_SIZE.width * 0.65 ),
//      (int) Math.round( INTERMEDIATE_RENDERING_SIZE.height * 0.35 ) ),
//    0.18, // Scale factor - smaller numbers "zoom out", bigger ones "zoom in".
//      true );
//
//    // Listen to the model for notifications that we care about.
//    photonAbsorptionModel.addListener( new PhotonAbsorptionModel.Adapter() {
//
//      @Override
//      public void photonRemoved( Photon photon ) {
//        if ( photonLayer.removeChild( photonMap.get( photon ) ) == null ) {
//          System.out.println( getClass().getName() + " - Error: PhotonNode not found for photon." );
//        }
//        photonMap.remove( photon );
//      }
//
//      @Override
//      public void photonAdded( Photon photon ) {
//        PAPhotonNode photonNode = new PAPhotonNode( photon, mvt );
//        photonLayer.addChild( photonNode );
//        photonMap.put( photon, photonNode );
//      }
//
//      @Override
//      public void moleculeRemoved( Molecule molecule ) {
//        removeMolecule( molecule );
//      }
//
//      @Override
//      public void moleculeAdded( Molecule molecule ) {
//        addMolecule( molecule );
//      }
//
//      @Override
//      public void modelReset() {
//        // Hide the spectrum window (if it is showing) and set it
//        // back to its default size.
//        spectrumWindow.setVisible( false );
//        spectrumWindow.setToDefaultSizeAndPosition();
//      }
//    } );
//
//    // Create the node that will be the root for all the world children on
//    // this canvas.  This is done to make it easier to zoom in and out on
//    // the world without affecting screen children.
//    myWorldNode = new PNode();
//    addWorldChild( myWorldNode );
//
//    // Add the layers.
//    moleculeLayer = new PNode();
//    myWorldNode.addChild( moleculeLayer );
//    photonLayer = new PNode();
//    myWorldNode.addChild( photonLayer );
//    photonEmitterLayer = new PNode();
//    myWorldNode.addChild( photonEmitterLayer );
//
//    // Create the control panel for photon emission frequency.
//    PNode photonEmissionControlPanel = new QuadEmissionFrequencyControlPanel( photonAbsorptionModel );
//    photonEmissionControlPanel.setOffset( -30, 500 );
//
//    // Create the photon emitter.
//    PNode photonEmitterNode = new PhotonEmitterNode( PHOTON_EMITTER_WIDTH, mvt, photonAbsorptionModel );
//    photonEmitterNode.setOffset( mvt.modelToViewDouble( photonAbsorptionModel.getPhotonEmissionLocation() ) );
//
//    // Create the rod that connects the emitter to the control panel.
//    PNode connectingRod = new VerticalRodNode( 30,
//      Math.abs( photonEmitterNode.getFullBoundsReference().getCenterY() - photonEmissionControlPanel.getFullBoundsReference().getCenterY() ),
//      new Color( 205, 198, 115 ) );
//
//    connectingRod.setOffset(
//        photonEmitterNode.getFullBoundsReference().getCenterX() - connectingRod.getFullBoundsReference().width / 2,
//      photonEmitterNode.getFullBoundsReference().getCenterY() );
//
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
//    // Add the nodes in the order necessary for correct layering.
//    photonEmitterLayer.addChild( connectingRod );
//    photonEmitterLayer.addChild( photonEmitterNode );
//    photonEmitterLayer.addChild( photonEmissionControlPanel );
//
//    // Add in the initial molecule(s).
//    for ( Molecule molecule : photonAbsorptionModel.getMolecules() ) {
//      addMolecule( molecule );
//    }
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
//  private void addMolecule( Molecule molecule ) {
//    molecule.addListener( moleculeMotionListener );
//    MoleculeNode moleculeNode = new MoleculeNode( molecule, mvt );
//    moleculeLayer.addChild( moleculeNode );
//    moleculeMap.put( molecule, moleculeNode );
//    updateRestoreMolecueButtonVisibility();
//  }
//
//  private void removeMolecule( Molecule molecule ) {
//    if ( moleculeLayer.removeChild( moleculeMap.get( molecule ) ) == null ) {
//      System.out.println( getClass().getName() + " - Error: MoleculeNode not found for molecule." );
//    }
//    moleculeMap.remove( molecule );
//    updateRestoreMolecueButtonVisibility();
//    molecule.removeListener( moleculeMotionListener );
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

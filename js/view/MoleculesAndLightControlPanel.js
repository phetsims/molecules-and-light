//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the "Molecules and Light" sim.  Allows the user pause and restart the simulation
 * as well as control which molecule is being simulated.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // Modules
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Color = require( 'SCENERY/util/Color' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Panel = require( 'SUN/Panel' );
  var MoleculeSelectorPanel = require( 'MOLECULES_AND_LIGHT/view/MoleculeSelectorPanel' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/MoleculeNode' );
  var CO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO' );

  // Images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  // Class Data for the control panel
  // Model view transform used for creating images of the various molecules.
  // This is basically a null transform except that it flips the Y axis so
  // that molecules on the panel are oriented the same as in the play area.
  var MVT = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1 );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  function MoleculesAndLightControlPanel( model ) {

    // The following data structure defines each of the molecule selectors
    // that will exist on this control panel.
    var moleculeSelectors = [];

    // Create the reset all button.
    var resetAllButton = new ResetAllButton();

    // Create the molecule selector panels for this control panel. TODO: These wil be pushed into moleculeSelectors array.
    var testSelectorPanel = new MoleculeSelectorPanel( "Carbon Monoxide", "CO", new MoleculeNode( new CO(), MVT), model );

    // Include all contents of the control panel.
    var content = new VBox( {align: 'center', spacing: 20, children: [ testSelectorPanel, resetAllButton ] } );

    Panel.call( this, content );
  }

  return inherit( Panel, MoleculesAndLightControlPanel );


} );

// CONSTRUCTOR


//    PhetTitledPanel moleculeSelectionPanel = new PhetTitledPanel( MoleculesAndLightResources.getString( "ControlPanel.Molecule" ) );
//    moleculeSelectionPanel.setLayout( new GridBagLayout() );
//    GridBagConstraints constraints = new GridBagConstraints( 0, GridBagConstraints.RELATIVE, 1, 1, 1, 1, GridBagConstraints.CENTER, GridBagConstraints.HORIZONTAL, new Insets( 0, 0, 0, 0 ), 0, 0 );
//    addControlFullWidth( moleculeSelectionPanel );
//
//    // Create the selector panels for each molecule and put them on a list.
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.CarbonMonoxide"),MoleculesAndLightResources.getString("ControlPanel.CO"), createMoleculeImage( new CO(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_CO_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.Nitrogen"), MoleculesAndLightResources.getString("ControlPanel.N2"), createMoleculeImage( new N2(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_N2_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.Oxygen"), MoleculesAndLightResources.getString("ControlPanel.O2"), createMoleculeImage( new O2(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_O2_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.CarbonDioxide"), MoleculesAndLightResources.getString("ControlPanel.CO2"), createMoleculeImage( new CO2(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_CO2_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.Water"), MoleculesAndLightResources.getString("ControlPanel.H2O"), createMoleculeImage( new H2O(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_H2O_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.NitrogenDioxide"), MoleculesAndLightResources.getString("ControlPanel.NO2"), createMoleculeImage( new NO2(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_NO2_MOLECULE ));
//    moleculeSelectors.add( new MoleculeSelectorPanel( MoleculesAndLightResources.getString("ControlPanel.Ozone"), MoleculesAndLightResources.getString("ControlPanel.O3"), createMoleculeImage( new O3(), MOLECULE_SCALING_FACTOR ), model, PhotonTarget.SINGLE_O3_MOLECULE ));
//
//    // Add the molecule selection panels to the main panel.
//
//    int interSelectorSpacing = 15;
//    ButtonGroup buttonGroup = new ButtonGroup();
//
//    for ( MoleculeSelectorPanel moleculeSelector : moleculeSelectors ){
//      moleculeSelectionPanel.add(  createVerticalSpacingPanel( interSelectorSpacing ), constraints );
//      moleculeSelectionPanel.add(  moleculeSelector, constraints );
//      buttonGroup.add( moleculeSelector.getRadioButton() ); // This prevent toggling when clicking same button twice.
//    }
//
//    moleculeSelectionPanel.add(  createVerticalSpacingPanel( interSelectorSpacing ), constraints );
//
//    // Add the Reset All button.
//    addControlFullWidth( createVerticalSpacingPanel( 5 ) );
//    addResetAllButton( module );
//  }
//
//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------
//
//  private JPanel createVerticalSpacingPanel( int space ) {
//    JPanel spacePanel = new JPanel();
//    spacePanel.setLayout( new BoxLayout( spacePanel, BoxLayout.Y_AXIS ) );
//    spacePanel.add( Box.createVerticalStrut( space ) );
//    return spacePanel;
//  }
//
//  */
///**
//   * Creates a buffered image of a molecule given an instance of a Molecule
//   * object.
//   *
//   * @param molecule
//   * @return
//   *//*
//
//  private BufferedImage createMoleculeImage( Molecule molecule, double scaleFactor ) {
//    BufferedImage unscaledMoleculeImage = new MoleculeNode( molecule, MVT ).getImage();
//    return BufferedImageUtils.multiScale( unscaledMoleculeImage, scaleFactor );
//  }
//}*/

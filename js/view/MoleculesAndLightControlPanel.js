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
  var CO2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO2' );
  var H2O = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/H2O' );
  var N2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/N2' );
  var O2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/O2' );
  var NO2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO2' );
  var O3 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/O3' );

  // Strings
  var carbonMonoxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonMonoxide' );
  var nitrogenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Nitrogen' );
  var oxygenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Oxygen' );
  var carbonDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonDioxide' );
  var nitrogenDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.NitrogenDioxide' );
  var ozoneString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Ozone' );
  var waterString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Water' );
  var COString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CO' );
  var N2String = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.N2' );
  var O2String = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.O2' );
  var CO2String = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CO2' );
  var NO2String = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.NO2' );
  var O3String = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.O3' );
  var H2OString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.H20' );


  // Images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  // Class Data for the control panel
  // Model view transform used for creating images of the various molecules.
  // This is basically a null transform except that it flips the Y axis so
  // that molecules on the panel are oriented the same as in the play area.
  var MVT = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1 );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  function MoleculesAndLightControlPanel( model, options ) {

    options = _.extend( {
      stroke: null,
      fill: new Color( 206, 206, 206 ),
      lineWidth: 3
    }, options );

    // The following data structure defines each of the molecule selectors
    // that will exist on this control panel.
    this.moleculeSelectors = [];

    // Create the reset all button.
    var resetAllButton = new ResetAllButton();

    // Create the molecule selector panels for this control panel and push into the selector array.
    //this.moleculeSelectors.push( new MoleculeSelectorPanel( "Carbon Monoxide", "CO", new MoleculeNode( new CO(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Nitrogen", "N2", new MoleculeNode( new N2(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Oxygen", "O2", new MoleculeNode( new O2(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Carbon Dioxide", "CO2", new MoleculeNode( new CO2(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Water", "H2O", new MoleculeNode( new H2O(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Nitrogen Dioxide", "NO2", new MoleculeNode( new NO2(), MVT), model ) );
//    moleculeSelectors.push( new MoleculeSelectorPanel( "Ozone", "O3", new MoleculeNode( new O3(), MVT), model ) );
    // Include all contents of the control panel.
    var content = new VBox( {fill: Color.BLACK, stroke: null, align: 'center', spacing: 20, children: [
      new MoleculeSelectorPanel( carbonMonoxideString, COString, new MoleculeNode( new CO(), MVT), 'SINGLE_CO_MOLECULE', model ),
      new MoleculeSelectorPanel( nitrogenString, N2String, new MoleculeNode( new N2(), MVT), 'SINGLE_N2_MOLECULE', model ),
      new MoleculeSelectorPanel( oxygenString, O2String, new MoleculeNode( new O2(), MVT),'SINGLE_O2_MOLECULE', model ),
      new MoleculeSelectorPanel( carbonDioxideString, CO2String, new MoleculeNode( new CO2(), MVT), 'SINGLE_CO2_MOLECULE', model ),
      new MoleculeSelectorPanel( waterString, H2OString, new MoleculeNode( new H2O(), MVT), 'SINGLE_H2O_MOLECULE', model ),
      new MoleculeSelectorPanel( nitrogenDioxideString, NO2String, new MoleculeNode( new NO2(), MVT), 'SINGLE_NO2_MOLECULE', model ),
      new MoleculeSelectorPanel( ozoneString, O3String, new MoleculeNode( new O3(), MVT), 'SINGLE_O3_MOLECULE', model ),
      resetAllButton
    ] } );
    Panel.call( this, content, options );

    model.photonTargetProperty.link( function() {
      model.setPhotonTarget( model.photonTargetProperty.get() );
    });
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

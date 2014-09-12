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
  var Color = require( 'SCENERY/util/Color' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Panel = require( 'SUN/Panel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
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

    var photonTargets = ['SINGLE_CO_MOLECULE', 'SINGLE_N2_MOLECULE', 'SINGLE_O2_MOLECULE', 'SINGLE_CO2_MOLECULE',
      'SINGLE_H2O_MOLECULE', 'SINGLE_NO2_MOLECULE', 'SINGLE_O3_MOLECULE'];

    // Include all contents of the control panel.
    var content = [
      new MoleculeSelectorPanel( carbonMonoxideString, new MoleculeNode( new CO(), MVT), 'SINGLE_CO_MOLECULE', model ),
      new MoleculeSelectorPanel( nitrogenString, new MoleculeNode( new N2(), MVT), 'SINGLE_N2_MOLECULE', model ),
      new MoleculeSelectorPanel( oxygenString, new MoleculeNode( new O2(), MVT),'SINGLE_O2_MOLECULE', model ),
      new MoleculeSelectorPanel( carbonDioxideString, new MoleculeNode( new CO2(), MVT), 'SINGLE_CO2_MOLECULE', model ),
      new MoleculeSelectorPanel( waterString, new MoleculeNode( new H2O(), MVT), 'SINGLE_H2O_MOLECULE', model ),
      new MoleculeSelectorPanel( nitrogenDioxideString, new MoleculeNode( new NO2(), MVT), 'SINGLE_NO2_MOLECULE', model ),
      new MoleculeSelectorPanel( ozoneString, new MoleculeNode( new O3(), MVT), 'SINGLE_O3_MOLECULE', model )
    ];

    var radioButtonContent = [];
    for ( var i = 0; i < photonTargets.length; i++ ) {
      radioButtonContent.push( { value: photonTargets[i], node: content[i] } );
    }

    var radioButtons = new RadioButtonGroup( model.photonTargetProperty, radioButtonContent,
      {
        alignVertically: true,
        spacing: 10,
        baseColor: 'black',
        contentYMargin: 0,
        selectedStroke: 'white',
        deselectedLineWidth: 0,
        cornerRadius: 7
      } );

    Panel.call( this, radioButtons, { fill: 'black' } );

    model.photonTargetProperty.link( function() {
      model.setPhotonTarget( model.photonTargetProperty.get() );
    });
  }

  return inherit( Panel, MoleculesAndLightControlPanel );


} );

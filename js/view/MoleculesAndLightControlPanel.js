//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the "Molecules and Light" sim.  Allows the user control which molecule is being simulated.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // Modules
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var MoleculeSelectorPanel = require( 'MOLECULES_AND_LIGHT/view/MoleculeSelectorPanel' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/MoleculeNode' );
  var CO = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/CO' );
  var CO2 = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/CO2' );
  var H2O = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/H2O' );
  var N2 = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/N2' );
  var O2 = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/O2' );
  var NO2 = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/NO2' );
  var O3 = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/molecules/O3' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // Strings
  var carbonMonoxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonMonoxide' );
  var nitrogenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Nitrogen' );
  var oxygenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Oxygen' );
  var carbonDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonDioxide' );
  var nitrogenDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.NitrogenDioxide' );
  var ozoneString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Ozone' );
  var waterString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Water' );

  // Class Data
  // Model view transform used for creating images of the various molecules. This is basically a null transform except
  // that it flips the Y axis so that molecules on the panel are oriented the same as in the play area.
  var MVT = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1 );

  // Chemical formulas for the button labels.
  var CO_FORMULA_STRING = 'CO';
  var N2_FORMULA_STRING = 'N<sub>2</sub>';
  var O2_FORMULA_STRING = 'O<sub>2</sub>';
  var CO2_FORMULA_STRING = 'CO<sub>2</sub>';
  var NO2_FORMULA_STRING = 'NO<sub>2</sub>';
  var O3_FORMULA_STRING = 'O<sub>3</sub>';
  var H20_FORMULA_STRING = 'H<sub>2</sub>O';

  /**
   * Constructor for a Molecules and Light control panel.
   *
   * @param { PhotonAbsorptionModel } model - The model controlled by this panel.
   * @constructor
   */
  function MoleculesAndLightControlPanel( model ) {

    // Format the chemical formulas.  Append these formulas to the molecule names.
    var photonTargets = ['SINGLE_CO_MOLECULE', 'SINGLE_N2_MOLECULE', 'SINGLE_O2_MOLECULE', 'SINGLE_CO2_MOLECULE',
      'SINGLE_H2O_MOLECULE', 'SINGLE_NO2_MOLECULE', 'SINGLE_O3_MOLECULE'];
    // Include all contents of the control panel.
    var content = [
      new MoleculeSelectorPanel( carbonMonoxideString, CO_FORMULA_STRING, new MoleculeNode( new CO(), MVT ) ),
      new MoleculeSelectorPanel( nitrogenString, N2_FORMULA_STRING, new MoleculeNode( new N2(), MVT ) ),
      new MoleculeSelectorPanel( oxygenString, O2_FORMULA_STRING, new MoleculeNode( new O2(), MVT ) ),
      new MoleculeSelectorPanel( carbonDioxideString, CO2_FORMULA_STRING, new MoleculeNode( new CO2(), MVT ) ),
      new MoleculeSelectorPanel( waterString, H20_FORMULA_STRING, new MoleculeNode( new H2O(), MVT ) ),
      new MoleculeSelectorPanel( nitrogenDioxideString, NO2_FORMULA_STRING, new MoleculeNode( new NO2(), MVT ) ),
      new MoleculeSelectorPanel( ozoneString, O3_FORMULA_STRING, new MoleculeNode( new O3(), MVT ) )
    ];

    var radioButtonContent = [];
    for ( var i = 0; i < photonTargets.length; i++ ) {
      radioButtonContent.push( { value: photonTargets[i], node: content[i] } );
    }

    var radioButtons = new RadioButtonGroup( model.photonTargetProperty, radioButtonContent,
      {
        spacing: 1.75,
        baseColor: 'black',
        buttonContentYMargin: 7,
        selectedStroke: 'white',
        deselectedLineWidth: 0,
        cornerRadius: 7
      } );

    Panel.call( this, radioButtons, { fill: 'black' } );

    model.photonTargetProperty.link( function() {
      model.setPhotonTarget( model.photonTargetProperty.get() );
    } );
  }

  return inherit( Panel, MoleculesAndLightControlPanel );


} );

//  Copyright 2002-2014, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );


  // Class Data for the Molecule Selector Panels
  // Model view transform used for creating images of the various molecules.
  // This is basically a null transform except that it flips the Y axis so
  // that molecules on the panel are oriented the same as in the play area.
  var MVT = new ModelViewTransform2( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1, true );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  /**
   *
   * @param {String} molecule
   * @param {String} molecularAbbreviation
   * @param(MoleculeNode} moleculeNode
   * @constructor
   */
  function MoleculeSelectorPanel( molecule, molecularAbbreviation, moleculeNode, model ) {

    // Create the node containing the molecule name and associated molecular abbreviation which will describe the radio button.
    var molecularName = new VBox( { children: [
      new Text( molecule),
      new Text( molecularAbbreviation )
    ], align: 'left' } );

    // Create the inner HBox which contains the the radio button and moleculeName boz.
    var moleculeButton = new HBox( { children: [
      new AquaRadioButton( model.photonTargetProperty, 'SINGLE_CO_MOLECULE', molecularName, { scale: 0.75 } )
    ]});

    // Scale the molecule node to an appropriate size for the panel display.
    moleculeNode.scale( MOLECULE_SCALING_FACTOR );

    // Include all contents of the molecule selector panel.
    var content = new HBox( {align: 'center', spacing: 20, children: [ moleculeButton, moleculeNode ] } );

    Panel.call( this, content );
  }
  return inherit( Panel, MoleculeSelectorPanel );

} );
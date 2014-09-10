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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Property = require( 'AXON/Property' );
  var Node = ( 'SCENERY/nodes/Node' );

  // Class Data for the Molecule Selector Panels
  // Model view transform used for creating images of the various molecules.
  // This is basically a null transform except that it flips the Y axis so
  // that molecules on the panel are oriented the same as in the play area.
  //var MVT = new ModelViewTransform2( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1, true );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  /**
   * @param {String} moleculeName
   * @param(MoleculeNode} moleculeNode
   * @param {object} options
   * @constructor
   */
  function MoleculeSelectorPanel( moleculeName, moleculeNode, options) {
    options = _.extend( {
      stroke: null,
      fill: 'black',
      lineWidth: 3
    }, options );

    // Invisible node to keep track of panel layout.
    var content = new Rectangle( 0, 0, 300, 0 );
    // Text containing the molecule name and abbreviation
    var font = new PhetFont( { size: 20, family: 'Sans-serif' } );
    var molecularName = new Text( moleculeName, { fill: 'white', font: font } ).setCenterY( content.getCenterY() );
    molecularName.setLeft( 10 );

    // Scale the molecule node to an appropriate size for the panel display.
    moleculeNode.scale( MOLECULE_SCALING_FACTOR );
    moleculeNode.setRight( 290 );
    moleculeNode.setCenterY( content.getCenterY() );

    // Addd the molecular namde and molecule node to the selector panel.
    content.addChild( molecularName);
    content.addChild( moleculeNode );

    Panel.call( this, content, options );

  }
  return inherit( Panel, MoleculeSelectorPanel );

} );
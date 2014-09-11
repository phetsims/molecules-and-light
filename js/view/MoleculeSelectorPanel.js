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

    Rectangle.call( this, 0, 0, 280, 0, options );

    // Text containing the molecule name and abbreviation
    var font = new PhetFont( { size: 18, family: 'Sans-serif' } );
    var molecularName = new Text( moleculeName, { fill: 'white', font: font } );
    molecularName.setCenterY( this.getCenterY() );
    molecularName.setLeft( this.getLeft() + 10 );

    // Scale the molecule node to an appropriate size for the panel display.
    moleculeNode.scale( MOLECULE_SCALING_FACTOR );
    moleculeNode.setRight( this.getRight() - 10 );
    moleculeNode.setCenterY( this.getCenterY() );

    // Add the molecular name and molecule node to the selector panel.
    this.addChild( molecularName );
    this.addChild( moleculeNode );
  }

  return inherit( Rectangle, MoleculeSelectorPanel );
} );
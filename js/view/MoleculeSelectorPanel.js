//  Copyright 2002-2014, University of Colorado Boulder

/**
* Selector panel for a single molecule.  This will construct one of the panels to be used in the full Molecules and
 * Light control panel.
 *
 * @author Jesse Greenberg ( PhET Interactive Simulations )
 */

define( function( require ) {
  'use strict';

  // Modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // Class Data for the Molecule Selector Panels
  // Model view transform used for creating images of the various molecules.
  // This is basically a null transform except that it flips the Y axis so
  // that molecules on the panel are oriented the same as in the play area.
  //var MVT = new ModelViewTransform2( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1, true );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  /**
   * Constructor for a molecule selector panel.  This is a single panel of the molecules and light control panel.
   *
   * @param {String} moleculeName
   * @param(MoleculeNode} moleculeNode
   * @param {Object} [options]
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
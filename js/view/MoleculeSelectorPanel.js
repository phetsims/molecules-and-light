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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.0975;

  /**
   * Constructor for a molecule selector panel.  This is a single panel of the molecules and light control panel.
   *
   * @param {string} moleculeName - The written name of the molecule
   * @param {string} moleculeFormula - The chemical formula representation of the molecule, HTML5 format for SubSupText
   * @param {MoleculeNode} moleculeNode - The molecule node for this selector panel
   * @constructor
   */
  function MoleculeSelectorPanel( moleculeName, moleculeFormula, moleculeNode ) {

    Rectangle.call( this, 0, 0, 215, 0, { stroke: null, fill: 'black', lineWidth: 3 } );

    // Create text label for the molecule name and append the chemical formula in parentheses.
    var font = new PhetFont( { size: 13, family: 'Sans-serif' } );
    this.molecularName = new SubSupText( moleculeName + ' (' + moleculeFormula + ')', { fill: 'white', font: font } );
    this.molecularName.setCenterY( this.getCenterY() );
    this.molecularName.setLeft( this.getLeft() + 10 );

    // Scale the molecule node to an appropriate size for the panel display and set its position in the panel.
    moleculeNode.scale( MOLECULE_SCALING_FACTOR );
    moleculeNode.setRight( this.getRight() - 10 );
    moleculeNode.setCenterY( this.getCenterY() );

    // Scale the molecule name text.  This is here to support translations.
    var nameIconDistance = 35; // Minimum distance between molecule name and icon, chosen empirically.
    this.scaleFactor = (moleculeNode.left - nameIconDistance) / this.molecularName.width;

    // Add the molecular name and molecule node to the selector panel.
    this.addChild( this.molecularName );
    this.addChild( moleculeNode );
  }

  return inherit( Rectangle, MoleculeSelectorPanel );
} );
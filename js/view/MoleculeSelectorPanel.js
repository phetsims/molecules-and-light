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
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  // Scaling factor for the molecule images, determined empirically.
  var MOLECULE_SCALING_FACTOR = 0.13;

  /**
   * Constructor for a molecule selector panel.  This is a single panel of the molecules and light control panel.
   *
   * @param {String} moleculeName - The written name of the molecule
   * @param {String} moleculeFormula - The chemical formula representation of the molecule, HTML5 format for SubSupText
   * @param(MoleculeNode} moleculeNode - The molecule node for this selector panel
   * @param {Object} [options]
   * @constructor
   */
  function MoleculeSelectorPanel( moleculeName, moleculeFormula, moleculeNode, options ) {

    options = _.extend( {
      stroke: null,
      fill: 'black',
      lineWidth: 3
    }, options );

    Rectangle.call( this, 0, 0, 280, 0, options );

    // Create text label for the molecule name and append the chemical formula in parentheses.
    var font = new PhetFont( { size: 18, family: 'Sans-serif' } );
    var molecularName = new SubSupText( moleculeName + ' (' + moleculeFormula + ')', { fill: 'white', font: font } );
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
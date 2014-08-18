// Copyright 2002-2014, University of Colorado

/**
 * Visual representation of a molecule.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var Atom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/Atom' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var AtomNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/AtomNode' );
    var AtomicBondNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/AtomicBondNode' );



    // Model Data for the molecule node
  // This flag is used to turn on/off the appearance of the center of
  // gravity, which is useful for debugging.
  var SHOW_COG = false;

  function MoleculeNode( molecule, mvt ) {

    // supertype constructor
    Node.call( this );
    // Cary this node through the scope in nested functions.
    var thisNode = this;

    // Instance Data
    thisNode.atomLayer = new Node();
    thisNode.bondLayer = new Node();
    thisNode.addChild( thisNode.atomLayer );
    thisNode.addChild( thisNode.bondLayer );

    // Add the atoms which compose this molecule to the atomLayer
    // TODO: requires the AtomNode.js dependency file.
    console.log('The molecule is at position: ' + molecule.getCenterOfGravityPos() );
    for ( var atom = 0; atom < molecule.getAtoms().length; atom++ ) {
      console.log('The atom in this molecule is at position: ' + molecule.getAtoms()[atom].getPositionRef() );
      thisNode.atomLayer.addChild( new AtomNode( molecule.getAtoms()[atom], mvt ) );
    }

//    Add the atomic bonds which form the structure of this molecule to the bondLayer
//    TODO: requires the AtomicBondNode.js dependency file.
      var atomicBonds = molecule.getAtomicBonds();
      for( var i = 0; i < atomicBonds.length; i++ ) {
        thisNode.bondLayer.addChild( new AtomicBondNode( atomicBonds[i], mvt ));
      }

    molecule.on( 'electronicEnergyStateChanged', function() {
      for ( var i = 0; i < thisNode.atomLayer.children.length; i++ ) {
        var atomNode = thisNode.atomLayer.getChildAt( i );
        atomNode.setHighlighted( molecule.isHighElectronicEnergyState() );
      }

    } );

    // Move the bond layer behind the atoms.
    this.bondLayer.moveToBack();
    // Make sure the highlighting is correct when the simulation starts.
    molecule.trigger( 'electronicEnergyStateChanged' );


  }

  return inherit( Node, MoleculeNode );

} );

//
//
//  //------------------------------------------------------------------------
//  // Constructor(s)
//  //------------------------------------------------------------------------
//
//
//    // If enabled, show the center of gravity of the molecule.
//    if ( SHOW_COG ) {
//      double cogMarkerRadius = 5;
//      Shape cogMarkerShape = new Ellipse2D.Double( -cogMarkerRadius, -cogMarkerRadius, cogMarkerRadius * 2, cogMarkerRadius * 2 );
//      PNode cogMarkerNode = new PhetPPath( cogMarkerShape, Color.pink );
//      cogMarkerNode.setOffset( mvt.modelToViewDouble( molecule.getCenterOfGravityPos() ) );
//      atomLayer.addChild( cogMarkerNode );
//    }
//  }
//
//  //------------------------------------------------------------------------
//  // Methods
//  //------------------------------------------------------------------------
//
//  /**
//   * Retrieve an image representation of this node.  This was created in
//   * order to support putting molecule images on control panels, but may
//   * have other usages.
//   */
//  public BufferedImage getImage() {
//    Image image = this.toImage();
//    assert image instanceof BufferedImage;
//    if ( image instanceof BufferedImage ) {
//      return (BufferedImage) this.toImage();
//    }
//    else {
//      return null;
//    }
//  }
//}

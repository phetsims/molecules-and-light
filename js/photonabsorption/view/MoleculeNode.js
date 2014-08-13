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
  var Atom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Atom' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/AtomicBond' );

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
    for( var atom = 0; atom < molecule.getAtoms().length; atom++ ) {
      thisNode.atomLayer.addChild( new AtomNode( atom, mvt ) );
    }

    // Add the atomic bonds which form the structure of this molecule to the bondLayer
    // TODO: requires the AtomicBondNode.js dependency file.
    for( var atomicBond = 0; atomicBond < molecule.getAtomicBonds().length; atomicBond++ ) {
      thisNode.bondLayer.addChild( new AtomicBondNode ( atomicBond, mvt ) );
    }

  }

  return inherit( Node, MoleculeNode, {


  } )

} );

//

//
//  //------------------------------------------------------------------------
//  // Constructor(s)
//  //------------------------------------------------------------------------
//
//  public MoleculeNode( final Molecule molecule, ModelViewTransform2D mvt ) {
//    bondLayer = new PNode();
//    addChild( bondLayer );
//    atomLayer = new PNode();
//    addChild( atomLayer );
//
//    for ( Atom atom : molecule.getAtoms() ) {
//      atomLayer.addChild( new AtomNode( atom, mvt ) );
//    }
//
//    for ( AtomicBond atomicBond : molecule.getAtomicBonds() ) {
//      bondLayer.addChild( new AtomicBondNode( atomicBond, mvt ) );
//    }
//    final Molecule.Adapter listener = new Molecule.Adapter() {
//      @Override
//      public void electronicEnergyStateChanged( Molecule molecule ) {
//        super.electronicEnergyStateChanged( molecule );
//        for ( int i = 0; i < atomLayer.getChildrenCount(); i++ ) {
//          AtomNode atomNode = (AtomNode) atomLayer.getChild( i );
//          atomNode.setHighlighted( molecule.isHighElectronicEnergyState() );
//        }
//      }
//    };
//    molecule.addListener( listener );
//    listener.electronicEnergyStateChanged( molecule );
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

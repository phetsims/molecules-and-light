// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a molecule.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomicBondNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/AtomicBondNode' );
  var AtomNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/AtomNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * Constructor for a molecule node.
   *
   * @param {Molecule} molecule
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function MoleculeNode3D( molecule, modelViewTransform ) {

    // supertype constructor
    Node.call( this );

    // Carry this node through the scope in nested functions.
    var self = this;
    this.modelViewTransform = modelViewTransform; // @private

    // Instance Data
    var layers = [];

    // Create and add the atomic bonds which form the structure of this molecule to the bondLayer
    var atomicBonds = molecule.getAtomicBonds();
    for ( var i = 0; i < atomicBonds.length; i++ ) {
      var bond = atomicBonds[ i ];
      if ( bond.is3D() ) {
        var topAtom = bond.atom1;
        var bottomAtom = bond.atom2;

        if ( layers.length === 0 ) {
          layers.push( { bonds: [], atoms: [ bottomAtom ] }, { bonds: [ bond ], atoms: [ topAtom ] } );
        }
        else {
          // loop over the existing layers
          for (var j = 0; j < layers.length; j++) {
            if ( layers[ j ].atoms.contains( bottomAtom ) ) {
              if ( j !== layers.length - 1 ) {
                if ( !layers[ j + 1 ].atoms.contains( topAtom ) ) {
                  layers[ j + 1 ].atoms.push( topAtom );
                }
              }
              else {
                // create a new layer to house the top atom and bond
                layers.push( { atoms: [ topAtom ], bonds: [ bond ] } );
              }
            }
            else if ( layers[ j ].atoms.contains( topAtom ) ) {

            }
          }
        }
      }
      bondLayer.addChild( new AtomicBondNode( atomicBonds[ i ], this.modelViewTransform ) );
    }

    // Create nodes and add the atoms which compose this molecule to the atomLayer.
    for ( var atom = 0; atom < molecule.getAtoms().length; atom++ ) {
      this.atomNode = new AtomNode( molecule.getAtoms()[ atom ], self.modelViewTransform );
      atomLayer.addChild( this.atomNode );
    }

    // Link the high energy state to the property in the model.
    molecule.highElectronicEnergyStateProperty.link( function() {
      for ( var i = 0; i < atomLayer.children.length; i++ ) {
        var atomNode = atomLayer.getChildAt( i );
        atomNode.setHighlighted( molecule.highElectronicEnergyStateProperty.get() );
      }

    } );

  }

  moleculesAndLight.register( 'MoleculeNode3D', MoleculeNode3D );

  return inherit( Node, MoleculeNode3D );

} );
// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a molecule.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AtomicBondNode3D = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/AtomicBondNode3D' );
  const AtomNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/AtomNode' );
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const Node = require( 'SCENERY/nodes/Node' );

  /**
   * Constructor for a molecule node.
   *
   * @param {Molecule} molecule
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  class MoleculeNode3D extends Node {
    constructor( molecule, modelViewTransform ) {

      assert && assert( molecule.layers, '3d molecules must have a layers property' );

      // supertype constructor
      super();

      this.modelViewTransform = modelViewTransform; // @private

      // Instance Data
      this.layerNodes = [];

      molecule.layers.forEach( ( layerObject, i ) => {
        const layerNode = new Node();
        if ( layerObject.bonds ) {
          layerObject.bonds.forEach( atomicBond => {
            layerNode.addChild( new AtomicBondNode3D( atomicBond, modelViewTransform ) );
            // if ( i < 0 && molecule.layers[ i - 1 ].atoms.includes[ atomicBond.atom2 ] ) {
            // }
            // else {
            //   layerNode.addChild( new AtomicBondNode( atomicBond, modelViewTransform ) );
            // }
          } );
        }

        if ( layerObject.atoms ) {
          layerObject.atoms.forEach( atom => {
            layerNode.addChild( new AtomNode( atom, modelViewTransform ) );
          } );
        }

        this.layerNodes.push( layerNode );
        this.addChild( layerNode );
      } );

      // Link the high energy state to the property in the model.
      molecule.highElectronicEnergyStateProperty.link( () => {
        this.layerNodes.forEach( layerNode => {
          layerNode.children.forEach( child => {
            if ( child instanceof AtomNode ) {
              child.setHighlighted( molecule.highElectronicEnergyStateProperty.get() );
            }
          } );
        } );
      } );

    }
  }

  return moleculesAndLight.register( 'MoleculeNode3D', MoleculeNode3D );

} );
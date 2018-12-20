// Copyright 2014-2017, University of Colorado Boulder

/**
 * Class that represents an atomic bond in the view.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var Node = require( 'SCENERY/nodes/Node' );
  // var Vector2 = require( 'DOT/Vector2' );

  // constants that control the width of the bond representation with with respect to the average atom radius.
  var BOND_WIDTH_PROPORTION_SINGLE = 0.45;
  var BOND_COLOR = 'rgb(0, 200, 0)';

  /**
   * Constructor for an atomic bond node.
   *
   * @param {AtomicBond} atomicBond
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */

  function AtomicBondNode3D( atomicBond, modelViewTransform ) {
    assert && assert( atomicBond.bondCount > 0 && atomicBond.bondCount <= 3 );  // Only single through triple bonds currently supported.

    // @private
    this.atomicBond = atomicBond;
    this.modelViewTransform = modelViewTransform;
    this.atomicBonds = []; // Array which holds the lines for the atomicBonds.

    // supertype constructor
    Node.call( this );

    // Carry this node through the scope in nested functions.
    var self = this;

    // Calculate the width to use for the bond representation(s) // @private

    this.averageAtomRadius = modelViewTransform.modelToViewDeltaX( ( atomicBond.atom1.radius + atomicBond.atom2.radius ) / 2 );

    // Create the initial representation.
    this.initializeRepresentation();

    // Link the atomic bond view node to the model.  Atomic bonds must be updated when either atom changes position.
    this.atomicBond.atom1.positionProperty.link( function() {
      self.updateRepresentation();
    } );
    this.atomicBond.atom2.positionProperty.link( function() {
      self.updateRepresentation();
    } );

  }

  moleculesAndLight.register( 'AtomicBondNode3D', AtomicBondNode3D );

  return inherit( Node, AtomicBondNode3D, {

    /**
     * Draw the initial lines which represent the atomic bonds.  This function should only be called once.  Drawing the
     * lines a single time should provide a performance benefit.  This will also set the bond width for the lines for
     * each case of 1, 2, or 3 atomic bonds.
     * @private
     */
    initializeRepresentation: function() {

      var bondWidth; // Width of the line representing this bond.  Dependent on the number of bonds between the atoms.
      var bond1; // First bond shared by the atoms.

      switch( this.atomicBond.bondCount ) {
        case 1:
          bondWidth = BOND_WIDTH_PROPORTION_SINGLE * this.averageAtomRadius;
          bond1 = new Line( { lineWidth: bondWidth, stroke: BOND_COLOR } );
          this.atomicBonds.push( bond1 );
          this.addChild( bond1 );
          break;

        default:
          console.error( ' - Error: Can\'t represent bond number, value = ' + this.atomicBond.getBondCount() );
          assert && assert( false );
          break;
      }
    },

    /**
     * Update the atomic bond positions by setting the end points of line to the positions of the
     * atoms which share the bond.
     * @private
     */
    updateRepresentation: function() {

      var p1; // Point describing position of one end of the line representing this atomic bond.
      var p2; // Point describing position of the other end of the line representing the atomic bond.

      switch( this.atomicBond.bondCount ) {

        case 1:

          // Single bond, so connect it from the center of one atom to the center of the other
          var origin = this.atomicBond.atom1.positionProperty.get().copy();
          var atomVector = this.atomicBond.atom2.positionProperty.get().copy();
          // debugger;
          if ( this.atomicBond.top !== 'none' ) {
            var angle = atomVector.angle();
            var radius = this.atomicBond.atom2.radius * 0.45;
            atomVector.subtractXY( radius * Math.cos( angle ), radius * Math.sin( angle ) );

            if ( this.atomicBond.top === 'second' ) {
              // move p1 closer to p2
              radius = this.atomicBond.atom1.radius * 0.45;
              origin.addXY( radius * Math.cos( angle ), radius * Math.sin( angle ) );
            }
          }

          p1 = this.modelViewTransform.modelToViewPosition( origin );
          p2 = this.modelViewTransform.modelToViewPosition( atomVector );

          this.atomicBonds[ 0 ].setLine( p1.x, p1.y, p2.x, p2.y );
          break;

        default:
          console.error( ' - Error: Can\'t represent bond number, value = ' + this.atomicBond.bondCount );
          assert && assert( false );
          break;

      }
    }
  } );
} );



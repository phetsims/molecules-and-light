// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atomic bond in the view.
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
  var Path = require( 'SCENERY/nodes/Path' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Vector2 = require( 'DOT/Vector2' );
  var Color = require( 'SCENERY/util/Color' );

  // Constants that control the width of the bond representation with
  // with respect to the average atom radius.
  var BOND_WIDTH_PROPORTION_SINGLE = 0.45;
  var BOND_WIDTH_PROPORTION_DOUBLE = 0.28;
  var BOND_WIDTH_PROPORTION_TRIPLE = 0.24;
  var BOND_COLOR = new Color( 0, 200, 0 );

  /**
   * Constructor for an atomic bond node.
   *
   * @param { AtomicBond} atomicBond
   * @param { ModelViewTransform2 } mvt
   * @constructor
   */

  function AtomicBondNode( atomicBond, mvt ) {
    assert && assert( atomicBond.getBondCount() > 0 && atomicBond.getBondCount() <= 3 );  // Only single through triple bonds currently supported.

    // Instance Data
    this.atomicBond = atomicBond;
    this.mvt = mvt;

    // supertype constructor
    Node.call( this );
    // Cary this node through the scope in nested functions.
    var thisNode = this;

    // Calculate the width to use for the bond representation(s).
    this.averageAtomRadius = mvt.modelToViewDeltaX( ( atomicBond.getAtom1().getRadius() + atomicBond.getAtom2().getRadius() ) / 2 );

    // Link the atomic bond view node to the model.
    // TODO:  This implementation is not efficient.  Redraws the line nodes every step. Come up with a better way to do this.
    this.atomicBond.atom1.positionProperty.link( function() {
      thisNode.updateRepresentation();
    });

    // Create the initial representation.
    this.updateRepresentation();
  }

  return inherit( Node, AtomicBondNode, {

    updateRepresentation: function() {
      this.removeAllChildren();  // Clear out any previous representations.

      // TODO: Is this style for variable declaration acceptable for switch-case?
      var bondWidth;
      var bond1;
      var bond2;
      var bond3;
      var angle;
      var p1;
      var p2;
      var offsetVector;
      var transformedRadius;
      switch( this.atomicBond.getBondCount() ) {
        case 1:
          // Single bond, so connect it from the center of one atom to the
          // center of the other
          var transformedPt1 = this.mvt.modelToViewPosition( this.atomicBond.getAtom1().getPositionRef() );
          var transformedPt2 = this.mvt.modelToViewPosition( this.atomicBond.getAtom2().getPositionRef() );
          bondWidth = BOND_WIDTH_PROPORTION_SINGLE * this.averageAtomRadius;
          bond1 = new Line( transformedPt1, transformedPt2, {lineWidth: bondWidth, stroke: BOND_COLOR } );
          this.addChild( bond1 );
          break;

        case 2:
          // Double bond.
          transformedRadius = this.mvt.modelToViewDeltaX( Math.min( this.atomicBond.getAtom1().getRadius(),
            this.atomicBond.getAtom2().getRadius() ) );
          // Get the center points of the two atoms.
          p1 = this.mvt.modelToViewPosition( this.atomicBond.getAtom1().getPositionRef() );
          p2 = this.mvt.modelToViewPosition( this.atomicBond.getAtom2().getPositionRef() );
          angle = Math.atan2( p1.x - p2.x, p1.y - p2.y );
          // Create a vector that will act as the offset from the center
          // point to the origin of the bond line.
          offsetVector = Vector2.createPolar( transformedRadius / 3, angle );

          // Draw the bonds.
          bondWidth = BOND_WIDTH_PROPORTION_DOUBLE * this.averageAtomRadius;
          bond1 = new Line( p1.x + offsetVector.x, p1.y - offsetVector.y, p2.x + offsetVector.x, p2.y - offsetVector.y, { lineWidth: bondWidth, stroke: BOND_COLOR } );
          offsetVector.rotate( Math.PI );
          bond2 = new Line( p1.x + offsetVector.x, p1.y - offsetVector.y, p2.x + offsetVector.x, p2.y - offsetVector.y, { lineWidth: bondWidth, stroke: BOND_COLOR } );
          this.addChild( bond1 );
          this.addChild( bond2 );
          break;

        case 3:
          // Triple bond.
          transformedRadius = this.mvt.modelToViewDeltaX( Math.min( this.atomicBond.getAtom1().getRadius(),
            this.atomicBond.getAtom2().getRadius() ) );
          // Get the center points of the two atoms.
          p1 = this.mvt.modelToViewPosition( this.atomicBond.getAtom1().getPositionRef() );
          p2 = this.mvt.modelToViewPosition( this.atomicBond.getAtom2().getPositionRef() );
          angle = Math.atan2( p1.x - p2.x, p1.y - p2.y );
          // Create a vector that will act as the offset from the center
          // point to the origin of the bond line.
          offsetVector = Vector2.createPolar( transformedRadius * 0.6, angle );

          // Draw the bonds.
          bondWidth = BOND_WIDTH_PROPORTION_TRIPLE * this.averageAtomRadius;
          bond1 = new Line( p1, p2, { lineWidth: bondWidth, stroke: BOND_COLOR } );
          bond2 = new Line( p1.x + offsetVector.x, p1.y - offsetVector.y, p2.x + offsetVector.x, p2.y - offsetVector.y, { lineWidth: bondWidth, stroke: BOND_COLOR } );
          offsetVector.rotate( Math.PI );
          bond3 = new Line( p1.x + offsetVector.x, p1.y - offsetVector.y, p2.x + offsetVector.x, p2.y - offsetVector.y, { lineWidth: bondWidth, stroke: BOND_COLOR } );
          this.addChild( bond1 );
          this.addChild( bond2 );
          this.addChild( bond3 );
          break;

        default:
          console.error( " - Error: Can't represent bond number, value = " + this.atomicBond.getBondCount() );
          assert && assert( false );
          break;
      }
    }
  } )
} );



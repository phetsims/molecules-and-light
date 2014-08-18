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
    var Path = require( 'SCENERY/nodes/Path');
    var Line = require( 'SCENERY/nodes/Line' );
    var Vector2 = require( 'DOT/Vector2' );
    var Color = require( 'SCENERY/util/Color' );

    // Constants that control the width of the bond representation with
    // with respect to the average atom radius.
    var BOND_WIDTH_PROPORTION_SINGLE = 0.45;
    var BOND_WIDTH_PROPORTION_DOUBLE = 0.28;
    var BOND_WIDTH_PROPORTION_TRIPLE = 0.24;
    var BOND_COLOR = new Color( 0, 200, 0 );

    function AtomicBondNode( atomicBond, mvt ) {
        assert && assert( atomicBond.getBondCount() > 0 && atomicBond.getBondCount() <= 3 );  // Only single through triple bonds currently supported.

        // Instance Data
        this.atomicBond = atomicBond;
        this.mvt = mvt;

        // supertype constructor
        Node.call( this );
        // Cary this node through the scope in nested functions.
        var thisNode = this;
        //atomicBond.link( thisNode.updateRepresentation );

        console.log( this.atomicBond );

        // Calculate the width to use for the bond representation(s).
        this.averageAtomRadius = mvt.modelToViewDeltaX( ( atomicBond.getAtom1().getRadius() + atomicBond.getAtom2().getRadius() ) / 2 );

        // Create the initial representation.
        this.updateRepresentation();

    }

    return inherit( Node, AtomicBondNode, {

    updateRepresentation: function() {
        this.removeAllChildren();  // Clear out any previous representations.
        var bondWidth;
        switch( this.atomicBond.getBondCount() ) {
            case 1:
                // Single bond, so connect it from the center of one atom to the
                // center of the other.
                var transformedPt1 = this.mvt.modelToViewPosition( this.atomicBond.getAtom1().getPositionRef() );
                var transformedPt2 = this.mvt.modelToViewPosition( this.atomicBond.getAtom2().getPositionRef() );
                bondWidth = BOND_WIDTH_PROPORTION_SINGLE * this.averageAtomRadius;
                var line = new Line( transformedPt1, transformedPt2, {lineWidth: bondWidth, stroke: BOND_COLOR } );
                console.log( line );

                //var bond = new Path( shape, { fill: BOND_COLOR, lineWidth: 25 } );
               this.addChild( line );


//            case 2:
//                // Double bond.
//                var transformedRadius = mvt.modelToViewDifferentialXDouble( Math.min( atomicBond.getAtom1().getRadius(),
//                    atomicBond.getAtom2().getRadius() ) );
//                // Get the center points of the two atoms.
//                var p1 = mvt.modelToViewDouble( this.atomicBond.getAtom1().getPositionRef() );
//                var p2 = mvt.modelToViewDouble( this.atomicBond.getAtom2().getPositionRef() );
//                var angle = Math.atan2( p1.x - p2.x, p1.y - p2.y );
//                // Create a vector that will act as the offset from the center
//                // point to the origin of the bond line.
//                var offsetVector = Vector2.createPolar( transformedRadius/3, angle );
//
//                // Draw the bonds.
//                Stroke bondLineStroke = new BasicStroke( (float) ( BOND_WIDTH_PROPORTION_DOUBLE * averageAtomRadius ) );
//                var bond1 = new Path( shape, { fill: BOND_COLOR } );
//                bond1.setPathTo( new Line2D.Double( p1.getX() + offsetVector.getX(), p1.getY() - offsetVector.getY(), p2.getX() + offsetVector.getX(), p2.getY() - offsetVector.getY() ) );
//                offsetVector.rotate( Math.PI );
//                PPath bond2 = new PhetPPath( bondLineStroke, BOND_COLOR );
//                bond2.setPathTo( new Line2D.Double( p1.getX() + offsetVector.getX(), p1.getY() - offsetVector.getY(), p2.getX() + offsetVector.getX(), p2.getY() - offsetVector.getY() ) );
//                addChild( bond1 );
//                addChild( bond2 );
//                break;
//            }
//
//            case 3: {
//                // Triple bond.
//                // Double bond.
//                final double transformedRadius = mvt.modelToViewDifferentialXDouble( Math.min( atomicBond.getAtom1().getRadius(),
//                    atomicBond.getAtom2().getRadius() ) );
//                // Get the center points of the two atoms.
//                Point2D p1 = mvt.modelToViewDouble( atomicBond.getAtom1().getPositionRef() );
//                Point2D p2 = mvt.modelToViewDouble( atomicBond.getAtom2().getPositionRef() );
//                final double angle = Math.atan2( p1.getX() - p2.getX(), p1.getY() - p2.getY() );
//                // Create a vector that will act as the offset from the center
//                // point to the origin of the bond line.
//                MutableVector2D offsetVector = new MutableVector2D() {{
//                    setMagnitude( transformedRadius * 0.6 );
//                    setAngle( angle );
//                }};
//                // Draw the bonds.
//                Stroke bondLineStroke = new BasicStroke( (float) ( BOND_WIDTH_PROPORTION_TRIPLE * averageAtomRadius ) );
//                PPath bond1 = new PhetPPath( bondLineStroke, BOND_COLOR );
//                bond1.setPathTo( new Line2D.Double( p1, p2 ) );
//                PPath bond2 = new PhetPPath( bondLineStroke, BOND_COLOR );
//                bond2.setPathTo( new Line2D.Double( p1.getX() + offsetVector.getX(), p1.getY() - offsetVector.getY(), p2.getX() + offsetVector.getX(), p2.getY() - offsetVector.getY() ) );
//                offsetVector.rotate( Math.PI );
//                PPath bond3 = new PhetPPath( bondLineStroke, BOND_COLOR );
//                bond3.setPathTo( new Line2D.Double( p1.getX() + offsetVector.getX(), p1.getY() - offsetVector.getY(), p2.getX() + offsetVector.getX(), p2.getY() - offsetVector.getY() ) );
//                addChild( bond1 );
//                addChild( bond2 );
//                addChild( bond3 );
//                break;
//            }
//
//            default:
//                System.err.println( getClass().getName() + " - Error: Can't represent bond number, value = " + atomicBond.getBondCount() );
//                assert false;
//                break;
        }
    }

    } )

} );



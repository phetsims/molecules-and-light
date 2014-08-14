// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atom in the view.
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
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Color = require( 'SCENERY/util/Color' );

  function AtomNode( atom, mvt ) {

    // supertype constructor
    Node.call( this );
    // Cary this node through the scope in nested functions.
    var thisNode = this;

    // Instance Data
    this.atom = atom;
    this.mvt = mvt;

    // Create a gradient for giving the sphere a 3D effect.
    //var transformedRadius = mvt.modelToViewDifferentialXDouble( atom.getRadius() );
    var lightColor = Color.WHITE;
    var darkColor;
//    if ( atom.getRepresentationColor() !== Color.WHITE ) {
//      darkColor = atom.getRepresentationColor().colorUtilsDarker( 0.1 );
//    }
//    else {
//      darkColor = Color.LIGHT_GRAY;
//    }

    var highlightWidth = 13;
    var transformedRadius = mvt.modelToViewDeltaX( atom.getRadius() );
    this.highlightNode = new ShadedSphereNode( transformedRadius * 2 + highlightWidth * 2 );
    var atomNode = new ShadedSphereNode( transformedRadius * 2 );
    thisNode.addChild( thisNode.highlightNode );
    thisNode.addChild( atomNode );

  }

  return inherit( Node, AtomNode, {

    /**
     * @param {Boolean} highlighted
     */
    setHighlighted: function( highlighted ) {
      this.highlightNode.setVisible( highlighted );
    },


  updatePosition: function() {
    this.setOffset( this.mvt.modelToViewPosition( this.atom.getPositionRef() ) );
  }

  } );

} );

//  // ------------------------------------------------------------------------
//  // Constructor(s)
//  // ------------------------------------------------------------------------
//
//  public AtomNode( Atom atom, ModelViewTransform2D mvt ) {
//
//    final RoundGradientPaint baseGradientPaint =
//                             new RoundGradientPaint( -transformedRadius / 2, -transformedRadius / 2, lightColor, new Point2D.Double( transformedRadius / 2, transformedRadius / 2 ), darkColor );
//    final RoundGradientPaint haloGradientPaint =
//                             new RoundGradientPaint( 0, 0, Color.yellow, new Point2D.Double( transformedRadius + highlightWidth, transformedRadius + highlightWidth ), new Color( 0, 0, 0, 0 ) );
//    highlightNode = new PhetPPath( new Ellipse2D.Double( -transformedRadius - highlightWidth, -transformedRadius - highlightWidth,
//          transformedRadius * 2 + highlightWidth * 2, transformedRadius * 2 + highlightWidth * 2 ),
//      haloGradientPaint );
//    PhetPPath atomNode = new PhetPPath( new Ellipse2D.Double( -transformedRadius, -transformedRadius,
//        transformedRadius * 2, transformedRadius * 2 ), baseGradientPaint );
//    addChild( highlightNode );
//    addChild( atomNode );
//    atom.addObserver( new SimpleObserver() {
//      public void update() {
//        updatePosition();
//      }
//    } );
//    updatePosition();
//  }
//
//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------

//  // ------------------------------------------------------------------------
//  // Inner Classes and Interfaces
//  //------------------------------------------------------------------------


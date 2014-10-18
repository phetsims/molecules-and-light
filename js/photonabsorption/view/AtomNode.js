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
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );

  /**
   * Constructor for an atom node.
   *
   * @param { Atom } atom
   * @param { ModelViewTransform2 }mvt
   * @constructor
   */
  function AtomNode( atom, mvt ) {

    // supertype constructor
    Node.call( this );

    // Cary this node through the scope in nested functions.
    var thisNode = this;

    // Instance Data
    thisNode.atom = atom;
    thisNode.mvt = mvt;

    // Create a Shaded Sphere to give the atom a 3D effect.
    var transformedRadius = mvt.modelToViewDeltaX( atom.getRadius() );

    var haloGradientPaint = new RadialGradient( 0, 0, 0, 0, 0, transformedRadius * 2 ).addColorStop( 0, Color.YELLOW ).addColorStop( 1, Color.BLACK );
    this.highlightNode = new Circle( transformedRadius * 2, { fill: haloGradientPaint } );
    this.highlightNode.setOpacity( 0.6 );
    var atomNode = new ShadedSphereNode( transformedRadius * 2, {mainColor: this.atom.representationColor } );
    thisNode.addChild( atomNode );
    thisNode.addChild( this.highlightNode );

    this.atom.positionProperty.link( function() {
      thisNode.updatePosition();
    } );

    // Set initial positions.
    this.updatePosition();
  }

  return inherit( Node, AtomNode, {

    /**
     * @param {Boolean} highlighted
     */
    setHighlighted: function( highlighted ) {
      if ( highlighted ) {
        this.addChild( this.highlightNode );
        this.highlightNode.moveToBack();
      }
      else {
        this.removeChild( this.highlightNode );
      }
    },

    updatePosition: function() {
      this.translation = ( this.mvt.modelToViewPosition( this.atom.getPositionRef() ) );
    }

  } );

} );

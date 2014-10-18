// Copyright 2002-2014, University of Colorado

/**
 * A node that looks like a vertical rod that is shaded.  This is generally used to connect things in the view, or so
 * make something look like it is on a pole.
 * This object is no longer used.  Perhaps it should be deleted entirely.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Constructor for the vertical rod node.
   *
   * @param { Number } width
   * @param { Number } height
   * @param { Color } baseColor
   * @constructor
   */
  function VerticalRodNode( width, height, baseColor ) {

    // Supertype constructor
    Node.call( this );

    // Construct the rod with a color gradient and add the child.
    var connectingRod = new Rectangle( 0, 0, width, height,
      { fill: new LinearGradient( 0, 0, width, 0 ).addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ) ).addColorStop( 1, baseColor.colorUtilsDarker( 0.5 ) ) } );
    this.addChild( connectingRod );

  }

  return inherit( Node, VerticalRodNode );

} );

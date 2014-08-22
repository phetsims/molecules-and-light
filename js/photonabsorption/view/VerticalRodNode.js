// Copyright 2002-2014, University of Colorado

/**
 * A node that looks like a vertical rod that is shaded.  This is generally
 * used to connect things in the view, or so make something look like it is on
 * a pole.
 * TODO: This was in photon-absorption/view but the description makes it seem useful in many
 * TODO: applications.  Should this be a common node?
 *
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Color = require( 'SCENERY/util/Color' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );


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

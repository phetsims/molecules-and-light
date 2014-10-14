// Copyright 2002-2014, University of Colorado Boulder

/**
 * Window frame for the Molecules and Light application window.  This uses canvas node in order to draw certain shapes
 * which are not currently in PhET scenery.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Vector2 = require( 'DOT/Vector2' );

  function WindowFrameNode( model, lineWidth, innerColor, outerColor ) {

    // Set inputs as class variables so they can be used in canvas methods.
    this.model = model;
    this.lineWidth = lineWidth;
    this.innerColor = innerColor.toCSS();
    this.outerColor = outerColor.toCSS();

    CanvasNode.call( this );
    this.invalidatePaint();
  }

  return inherit( CanvasNode, WindowFrameNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      // Draw the left section of the window frame.
//      this.drawBorderWidth( this.model.rectArcWidth, 0, this.model.width - this.lineWidth, this.lineWidth, context );

      this.drawFrameCorner( new Vector2( this.model.rectArcWidth, this.model.rectArcHeight ), 'topLeft', context );
      this.drawFrameCorner( new Vector2(
        this.model.rectArcWidth, this.model.rectHeight - this.model.rectArcHeight ), 'bottomLeft', context );
      this.drawFrameCorner( new Vector2(
          this.model.rectWidth - this.model.rectArcWidth, this.model.rectHeight - this.model.rectArcHeight ), 'bottomRight', context );
      this.drawFrameCorner( new Vector2(
          this.model.rectWidth - this.model.rectArcWidth, this.model.rectArcHeight ), 'topRight', context );
    },

    /**
     * Draw a corner of the window frame.
     *
     * @param { Vector2 } radialCenter - Position vector of the radial center of the frame corner.
     * @param { String } corner - String describing desired corner of the window frame.
     * @param { CanvasRenderingContext2D } context - Context for the canvas methods.
     */
    drawFrameCorner: function( radialCenter, corner, context ) {

      // Determine the initial and final angles for arc methods based on input location.
      var initialAngle;
      var finalAngle;
      switch( corner ) {
        case 'topLeft':
          initialAngle = Math.PI;
          finalAngle = 3 * Math.PI / 2;
          break;
        case 'bottomLeft':
          initialAngle = Math.PI / 2;
          finalAngle = Math.PI;
          break;
        case 'bottomRight':
          initialAngle = 0;
          finalAngle = Math.PI / 2;
          break;
        case 'topRight':
          initialAngle = 3 * Math.PI / 2;
          finalAngle = 2 * Math.PI;
          break;
        default:
          console.error( 'Improper location for a frame corner.' );
          break;
      }

      // Draw the corner of the frame with canvas arc.
      context.beginPath(); // Begin and clear the path drawing context.
      context.arc( radialCenter.x, radialCenter.y, this.model.rectArcWidth + this.lineWidth/2, initialAngle, finalAngle, false );

      // Create the radial gradient for the arc on the corner.
      var grad = context.createRadialGradient( radialCenter.x, radialCenter.y, this.model.rectArcWidth,
        radialCenter.x, radialCenter.y, this.lineWidth + this.model.rectArcWidth );
      grad.addColorStop( 0, this.innerColor );
      grad.addColorStop( 1, this.outerColor );
      context.strokeStyle = grad;
      context.lineWidth = this.lineWidth;
      context.stroke();

    },

    /**
     * Function which creates the sections of the frame that span the width.  These sections are the top and
     * bottom of the border.
     *
     * @param { Number } x - x position of the upper left corner (left bound)
     * @param { Number } y - y position of the upper left corner (top bound)
     * @param { Number } width - Width of the rectangle to the right of the upper left corner
     * @param { Number } height - Height of the rectangle to the
     * @param { CanvasRenderingContext2D } context - The drawing context
     * TODO: Generalize this method for the bottom as well.
     */
    drawBorderWidth: function( x, y, width, height, context ) {

      var grad = context.createLinearGradient( x, y, x, y + this.lineWidth );
      grad.addColorStop( 0, 'red' );
      grad.addColorStop( 1, this.outerColor );
      context.fillStyle = grad;
      context.fillRect( x, y, x + width, y + height );

    }
  } );
} );

// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the bar magnet object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HSlider = require( 'SUN/HSlider' );
  var Property = require( 'AXON/Property' );

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  /**
   * @param {number} width - Desired width of the emitter image in screen coords. The
   *                          height will be based on the aspect ratio of the image.
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {*} options - Additional parameters to describe position or other attributes.
   */
  function PhotonEmitterNode( width, photonAbsorptionModel, options ) {

    // Supertype constructor
    Node.call( this );

    // add the a heatLamp to the center left of the screen.
    var heatLampNode = new Image( heatLampImage );
    this.addChild( heatLampNode );

    // add the slider to center of the photon emitter
    // TODO: HSlider options populate default parameters and get removed. Resimplify after HSlider is fixed.
    var sliderValue = new Property( 0 );
    var slider = new HSlider( sliderValue, { min: 0, max: 1 } );
    slider.centerY = heatLampNode.centerY;
    slider.centerX = heatLampNode.centerX;
    this.addChild( slider );

    // Handle additional options parameters
    this.mutate( options );
  }

  return inherit( Node, PhotonEmitterNode );
} );
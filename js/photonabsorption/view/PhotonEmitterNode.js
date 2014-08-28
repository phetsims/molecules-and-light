// Copyright 2002-2014, University of Colorado Boulder

/**
 * Node that represents the photon emitter in the view.  The graphical
 * representation of the emitter changes based on the wavelength of photons
 * that the model is set to emit.
 * This node is set up such that setting its offset on the photon emission
 * point in the model should position it correctly.  This assumes that photons
 * are emitted to the right.
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
  var HSlider = require( 'SUN/HSlider' );
  var Property = require( 'AXON/Property' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Color = require( 'SCENERY/util/Color' );
  var EmissionRateControlSliderNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/EmissionRateControlSliderNode' );


  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );
  var flashlight2Image = require( 'image!MOLECULES_AND_LIGHT/flashlight2.png' );
  var microwaveTransmitter = require( 'image!MOLECULES_AND_LIGHT/microwave-transmitter.png' );
  var uvLight2 = require( 'image!MOLECULES_AND_LIGHT/uv_light_2.png' );


  // Model data for the PhotonEmitterNode
  var SLIDER_RANGE = 100;

  /**
   * Constructor
   *
   * @param {Number} width - Desired width of the emitter image in screen coords.
   * The height will be based on the aspect ratio of the image.
   * @param {mvt} mvt - The moddel view transform for converting between model and view coordinate systems.
   * @param {PhotonAbsorptionModel} model
   * @param {*} options
   *
   */
  function PhotonEmitterNode( width, mvt, model, options ) {

    // Supertype constructor
    Node.call( this, { photonWavelength: WavelengthConstants.VISIBLE_WAVELENGTH} );

    // Cary this node through the scope in nested functions.
    var thisNode = this;

    this.model = model;
    this.mvt = mvt;

    // Create the layers on which the other nodes will be placed.
    this.emitterImageLayer = new Node();
    this.addChild( this.emitterImageLayer );
    this.emissionControlSliderLayer = new Node();
    this.addChild( this.emissionControlSliderLayer );
    this.emitterImageWidth = width;

    // Listen to model for events that may cause this node to change emitted wavelength.
    model.photonWavelengthProperty.link( function() {
      thisNode.updateImage( thisNode.emitterImageWidth );
    } );

    // Add the initial image.
    thisNode.updateImage( this.emitterImageWidth );

    // Add the slider that will control the rate of photon emission.
    // Add a background rectangle for the HSlider
    this.emissionRateControlSliderNode = new EmissionRateControlSliderNode( this.model, new Color( 255, 85, 0 ) );


//    this.emissionControlSliderLayer.addChild( this.emissionRateControlSliderNode );
  }

  return inherit( Node, PhotonEmitterNode, {

    /**
     * Set the appropriate image based on the current setting for the
     * wavelength of the emitted photons.
     *
     * @param {Number} flashlightWidth
     */

    updateImage: function( flashlightWidth ) {
      // Clear any existing image.
      this.emitterImageLayer.removeAllChildren();
      this.emissionControlSliderLayer.removeAllChildren();

      // Create the flashlight image node, setting the offset such that the
      // center right side of the image is the origin.  This assumes that
      // photons will be emitted horizontally to the right.

      if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.IR_WAVELENGTH ) {
        this.photonEmitterImage = new Image( heatLampImage );
      }
      else if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.VISIBLE_WAVELENGTH ) {
        this.photonEmitterImage = new Image( flashlight2Image );
      }
      else if ( this.model.getEmittedPhotonWavelength() == WavelengthConstants.UV_WAVELENGTH ) {
        this.photonEmitterImage = new Image( uvLight2 );
      }
      else if ( this.model.getEmittedPhotonWavelength() == WavelengthConstants.MICRO_WAVELENGTH ) {
        this.photonEmitterImage = new Image( microwaveTransmitter );
      }
      // Translate center and scale the emitter image
      this.photonEmitterImage.scale( flashlightWidth / this.photonEmitterImage.getImageWidth() );
      this.photonEmitterImage.setCenterX( -flashlightWidth );
      this.photonEmitterImage.setCenterY( -this.photonEmitterImage.getImageHeight() / 2 );
      this.emissionRateControlSliderNode = new EmissionRateControlSliderNode( this.model, new Color( 0, 85, 0 ) );

      // Add the emission rate control slider to the correct location on the photon emitter.
      // TODO: The emission rate control slider does not have a good length for the emitter it is attached to.  Update this.
      this.emissionRateControlSliderNode.setCenter( new Vector2(
          this.photonEmitterImage.getBounds().getCenterX() - this.emissionRateControlSliderNode.getBounds().getCenterX() / 2,
          this.photonEmitterImage.getBounds().getCenterY() - this.emissionRateControlSliderNode.getBounds().getCenterY() / 2 ) );

      this.emitterImageLayer.addChild( this.photonEmitterImage );
      this.emissionControlSliderLayer.addChild( this.emissionRateControlSliderNode );

    }
  } );
} );




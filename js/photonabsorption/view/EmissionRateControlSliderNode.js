// Copyright 2002-2014, University of Colorado Boulder

/**
 * Node that implements the slider that is used to control the emission
 * rate of photons.  The slider will update its background color based on
 * the emission wavelength, and will adjust its position as the
 * corresponding setting in the model changes.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HSlider = require( 'SUN/HSlider' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Color = require( 'SCENERY/util/Color' );
  var Property = require( 'AXON/Property' );
  var PhotonAbsorptionModel = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionModel' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  // Maximum value for slider range.
  var SLIDER_RANGE = 100;

  // Minimum and defaults for photon emission periods.  Note that the max is
  // assumed to be infinity.
  var MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET = 400;
  var DEFAULT_PHOTON_EMISSION_PERIOD = 3000; // Milliseconds of sim time.
  var MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET = 100;

  function EmissionRateControlSliderNode( model, options ) {

    // Supertype constructor
    Node.call( this, {} );

    // Options extension for position of the control slider.
    options = _.extend( {
      // default bond count
      position: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    var thisNode = this;
    var thisModel = model;
    this.model = model;
    this.color = new Color( 255, 85, 0); // RGB value for Phet's Color blind red.

    //this.sliderPositionProperty = new Property( 0 ); // Observable position of the slider

    this.emissionControlSliderSize = new Dimension2( 100, 30 ); // This may be adjusted as needed for best look.
    this.emissionRateControlSlider = new HSlider( model.emissionFrequencyProperty, { min: 0, max: SLIDER_RANGE } );


    // Create a background box for this node.
    var rectHeight = this.emissionRateControlSlider.height;
    var rectWidth = this.emissionRateControlSlider.width;
    this.backgroundRect = new Rectangle( -this.emissionRateControlSlider.options.thumbSize.width / 2,
        -this.emissionRateControlSlider.options.thumbSize.height / 2,
        this.emissionRateControlSlider.options.trackSize.width + this.emissionRateControlSlider.options.thumbSize.width,
        this.emissionRateControlSlider.options.trackSize.height + this.emissionRateControlSlider.options.thumbSize.height,
      0, 0, { fill: new LinearGradient( 0, 0, rectWidth, rectHeight ).addColorStop( 0, 'black' ).addColorStop( 1, this.color ),
      stroke: '#c0b9b9' } );

      ///0, 0, { fill: new Color( 255, 85, 0 ) } );

    // Listen to the model for events that may cause this node to change
    // state.
    this.model.photonWavelengthProperty.link( function() { thisNode.update() } );

    model.emissionFrequencyProperty.link( function() {
      var sliderProportion = thisModel.emissionFrequencyProperty.get() / SLIDER_RANGE;
      if ( sliderProportion === 0 ) {
        model.setPhotonEmissionPeriod( Number.POSITIVE_INFINITY );
      }
      else if ( model.getPhotonTarget() === 'CONFIGURABLE_ATMOSPHERE' ) {
        // Note the implicit conversion from frequency to period in the following line.
        model.setPhotonEmissionPeriod( (MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET / sliderProportion) );
      }
      else {
        // Note the implicit conversion from frequency to period in the following line.
        model.setPhotonEmissionPeriod( (MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET / sliderProportion) );
      }
    } );

    this.addChild( this.backgroundRect );
    this.addChild( this.emissionRateControlSlider );

  }

  return inherit( Node, EmissionRateControlSliderNode, {

    update: function() {
      // Adjust the position of the slider.  Note that we do a conversion
      // between period and frequency and map it into the slider's range.
      var mappedFrequency;
      if ( this.model.getPhotonTarget() === 'CONFIGURABLE_ATMOSPHERE' ) {
        mappedFrequency = Math.round( MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET /
                                      this.model.getPhotonEmissionPeriod() * SLIDER_RANGE );
      }
      else {
        mappedFrequency = Math.round( MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET /
                                      this.model.getPhotonEmissionPeriod() * SLIDER_RANGE );
      }

      this.emissionRateControlSlider.valueProperty = mappedFrequency;

      // Update the color of the slider.
      if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.IR_WAVELENGTH ) {
        // This is the rgb for PhetColorScheme.RED_COLORBLIND which tested well.
        this.color = new Color( 255, 85, 0);
      }
      else if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.VISIBLE_WAVELENGTH ) {
        this.color = Color.YELLOW;
      }
      else if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.UV_WAVELENGTH ) {
        this.color = new Color( 200, 0, 200 );
      }
      else if ( this.model.getEmittedPhotonWavelength() == WavelengthConstants.MICRO_WAVELENGTH ) {
        this.color = new Color( 200, 200, 200 );
      }
      else {
        console.error( "Error: Unrecognized photon." );
      }
    }
  } );

} );


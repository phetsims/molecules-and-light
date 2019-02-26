// Copyright 2018, University of Colorado Boulder

/**
 * A dialog that is only for exemplifying the kinds of things we can do with CSS color filters!
 *
 * This is working great in Chrome and Edge. In Edge the filters are broken, likely due to this bug:
 * https://stackoverflow.com/questions/35780409/position-fixed-not-working-when-css-filters-applied-on-same-element-in-microsoft
 * 
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Dialog = require( 'SUN/Dialog' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSlider = require( 'SUN/HSlider' );
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const ResetButton = require( 'SCENERY_PHET/buttons/ResetButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const COLOR_MATRICES = {
    BLACK_AND_WHIGHT: '0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 1 0',
    GREEN: '0.2 0 0 0 0 0 1 0 0 0 0 0 0.2 0 0 0 0 0 1 0'
  };

  const CONVOLUTION_MATRICES = {
    SHARPEN: '0 -1 0 -1 5 -1 0 -1 0',
    INTENSIFY: '-1 -1 -1 -1 9 -1 -1 -1 -1',
    EDGE_DETECTION: '-1 -1 -1 -1 8 -1 -1 -1 -1' // kind of...
  };

  class ColorFilterDialog extends Dialog {

    constructor( options ) {

      // url() - for applying SVG filters
      // custom() - "coming soon", but not really
      const createLabelledSlider = ( label, property ) => {
        return new HBox( {
          children: [ new Text( label, { font: new PhetFont( 18 ) } ), new HSlider( property, property.range ) ],
          spacing: 10
        } );
      };

      const blurProperty = new NumberProperty( 0, { range: new Range( 0, 5 ) } );
      const brightnessProperty = new NumberProperty( 100, { range: new Range( 50, 250 ) } ); // percentage
      const contrastProperty = new NumberProperty( 100, { range: new Range( 50, 250 ) } ); // percentage
      const grayscaleProperty = new NumberProperty( 0, { range: new Range( 0, 100 ) } ); // percentage
      const saturateProperty = new NumberProperty( 100, { range: new Range( 0, 400 ) } ); // percentage
      const hueRotationProperty = new NumberProperty( 0, { range: new Range( 0, 360 ) } ); // degrees
      const sepiaProperty = new NumberProperty( 0, { range: new Range( 0, 100 ) } ); // percentage
      const invertProperty = new NumberProperty( 0, { range: new Range( 0, 100 ) } ); // percentage

      const resetButton = new ResetButton( {
        listener: () => {
          this.resetFilters();
        },

        baseColor: 'rgb(153,206,255)'
      } );

      const buttonFont = new PhetFont( 14 );
      const greenButton = new RectangularPushButton( {
        content: new Text( 'Green!', { font: buttonFont } ),
        baseColor: 'green',
        listener: ()=> {
          this.resetFilters();
          this.applyColorFilter( COLOR_MATRICES.GREEN );
      } } );
      const blackWhiteButton = new RectangularPushButton( {
        content: new Text( 'Black and White!', { font: buttonFont } ),
        baseColor: 'white',
        listener: () => {
          this.resetFilters();
          this.applyColorFilter( COLOR_MATRICES.BLACK_AND_WHIGHT );
        }
      } );
      const sharpenButton = new RectangularPushButton( {
        content: new Text( 'Sharpen!', { font: buttonFont } ),
        baseColor: 'teal',
        listener: () => {
          this.resetFilters();
          this.applyConvolutionFilter( CONVOLUTION_MATRICES.SHARPEN );
        }
      } );
      const intensifyButton = new RectangularPushButton( {
        content: new Text( 'Intensify!', { font: buttonFont } ),
        baseColor: 'teal',
        listener: () => {
          this.resetFilters();
          this.applyConvolutionFilter( CONVOLUTION_MATRICES.INTENSIFY );
        }
      } );
      const edgeDetectionButton = new RectangularPushButton( {
        content: new Text( 'Naive Edge Detection!', { font: buttonFont } ),
        baseColor: 'teal',
        listener: () => {
          this.resetFilters();
          this.applyConvolutionFilter( CONVOLUTION_MATRICES.EDGE_DETECTION );
        }
      } );
      const colorButtons = new HBox( {
        children: [ greenButton, blackWhiteButton, sharpenButton, intensifyButton, edgeDetectionButton ],
        spacing: 5
      } );

      const slidersBox = new VBox( {
        children: [
          createLabelledSlider( 'Brightness:', brightnessProperty ),
          createLabelledSlider( 'Contrast:', contrastProperty ),
          createLabelledSlider( 'Grayscale:', grayscaleProperty ),
          createLabelledSlider( 'Sepia:', sepiaProperty ),
          createLabelledSlider( 'Invert:', invertProperty ),
          createLabelledSlider( 'Saturate:', saturateProperty ),
          createLabelledSlider( 'Hue Rotation:', hueRotationProperty ),
          createLabelledSlider( 'Blur:', blurProperty )
        ],
        align: 'left',
        spacing: 8
      } );

      const content = new VBox( {
        children: [
          slidersBox,
          colorButtons,
          resetButton
        ],
        spacing: 10
      } );

      super( content );

      // annoying, but need references in instance methods
      this.blurProperty = blurProperty;
      this.brightnessProperty = brightnessProperty;
      this.contrastProperty = contrastProperty;
      this.grayscaleProperty = grayscaleProperty;
      this.saturateProperty = saturateProperty;
      this.hueRotationProperty = hueRotationProperty;
      this.sepiaProperty = sepiaProperty;
      this.invertProperty = invertProperty;

      // defines how many pixels on the screen to blend into each other
      Property.multilink( [
        blurProperty,
        brightnessProperty,
        contrastProperty,
        grayscaleProperty,
        invertProperty,
        saturateProperty,
        hueRotationProperty,
        sepiaProperty
      ], ( blur, brightness, contrast, grayscale, invert, saturation, hueRotation, sepia ) => {
        this.updateStyle( blur, brightness, contrast, grayscale, invert, saturation, hueRotation, sepia );
      } );
    }

    /**
     * Order of setting these matters. For instance, you have to use grayscale before sepia or else the result
     * will be completely grey.
     * @param {number} blur
     * @param {number} brightness 
     * @param {number} contrast   
     * @param {number} grayscale  
     * @param {number} invert     
     * @param {number} saturation 
     * @param {number} hueRotation
     * @returns {number}     
     */
    updateStyle( blur, brightness, contrast, grayscale, invert, saturation, hueRotation, sepia ) {
      var filterString = 'blur(' + blur + 'px) ' +
                         'brightness(' + brightness + '%) ' +
                         'grayscale(' + grayscale + '%) ' +
                         'sepia(' + sepia + '%) ' +
                         'invert(' + invert + '%) ' +
                         'saturate(' + saturation + '%) ' +
                         'hue-rotate(' + hueRotation + 'deg) ' +
                         'contrast(' + contrast + '%)';
      phet.joist.sim.display.domElement.style.filter = filterString;
    }

    applyColorFilter( colorMatrix ) {

      const previousFilter = document.getElementById( 'filter' );
      if ( previousFilter !== null ) {
        document.body.removeChild( previousFilter );
      }

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'filter';
      svg.setAttribute( 'data-bind', 'real-svg' );

      var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = 'colorChange';

      var matrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      matrix.setAttribute( 'type', 'matrix' );
      matrix.setAttribute( 'values', colorMatrix );

      svg.appendChild( filter );
      filter.appendChild( matrix );
      document.body.appendChild( svg );

      phet.joist.sim.display.domElement.style.filter = 'url(#colorChange)';
    }

    applyConvolutionFilter( matrixString ) {
      const previousFilter = document.getElementById( 'filter' );
      if ( previousFilter !== null ) {
        document.body.removeChild( previousFilter );
      }

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'filter';
      svg.setAttribute( 'data-bind', 'real-svg' );

      var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = 'colorChange';

      var matrix = document.createElementNS('http://www.w3.org/2000/svg', 'feConvolveMatrix' );
      matrix.setAttribute( 'order', '3 3' );
      matrix.setAttribute( 'preserveAlpha', 'true' );
      matrix.setAttribute( 'kernelMatrix', matrixString );

      svg.appendChild( filter );
      filter.appendChild( matrix );
      document.body.appendChild( svg );

      phet.joist.sim.display.domElement.style.filter = 'url(#colorChange)';
    }

    resetFilters() {
      this.blurProperty.reset();
      this.brightnessProperty.reset();
      this.contrastProperty.reset();
      this.grayscaleProperty.reset();
      this.saturateProperty.reset();
      this.hueRotationProperty.reset();
      this.sepiaProperty.reset();
      this.invertProperty.reset();

      this.updateStyle(
        this.blurProperty.value,
        this.brightnessProperty.value,
        this.contrastProperty.value,
        this.grayscaleProperty.value,
        this.invertProperty.value,
        this.saturateProperty.value,
        this.hueRotationProperty.value,
        this.sepiaProperty.value
      );
    }
  }

  return moleculesAndLight.register( 'ColorFilterDialog', ColorFilterDialog );
} );

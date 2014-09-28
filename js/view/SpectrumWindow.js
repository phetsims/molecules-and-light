// Copyright 2002-2014, University of Colorado Boulder

/**
 * This class defines a separate window that shows a representation of the electromagnetic spectrum.
 *
 * @author Jesse Greenberg
 * @author John Blanco
 *
 */

define( function( require ) {
    'use strict';

    // modules
    var Text = require( 'SCENERY/nodes/Text' );
    var inherit = require( 'PHET_CORE/inherit' );
    var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
    var ScreenView = require( 'JOIST/ScreenView' );
    var Panel = require( 'SUN/Panel' );
    var PhetFont = require( 'SCENERY_PHET/PhetFont' );
    var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
    var VStrut = require( 'SUN/VStrut' );
    var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
    var Color = require( 'SCENERY/util/Color' );
    var Dimension2 = require( 'DOT/Dimension2' );
    var LinearGradient = require( 'SCENERY/util/LinearGradient' );
    var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
    var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );

    // strings
    var spectrumWindowTitleString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.title' );
    var frequencyArrowLabelString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.frequencyArrowLabel' );
    var wavelengthArrowLabelString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.wavelengthArrowLabel' );
    var spectrumWindowCloseString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.close' );

    /**
     * @constructor
     */
    function SpectrumWindow( ) {

      var spectrumWindow = this;

      /*
       * Use ScreenView, to help center and scale content. Renderer must be specified here because the window is added
       * directly to the scene, instead of to some other node that already has svg renderer.
       */
      ScreenView.call( this, {renderer: 'svg'} );

      var children = [
        new SpectrumDiagram(),
        new CloseButton( )
      ];

      var content = new LayoutBox( { orientation: 'vertical', align: 'center', spacing: 5, children: children } );

      this.addChild( new Panel( content, {
          centerX: this.layoutBounds.centerX,
          centerY: this.layoutBounds.centerY,
          xMargin: 20,
          yMargin: 20,
          fill: new Color( 233, 236, 174 ) } )
      );
    }

    /**
     * Class that contains the diagram of the EM spectrum.  This class includes the arrows, the spectrum strip, the
     * wavelength indicator, etc.  In other words, it is the top level node within which the constituent parts that make
     * up the entire diagram are contained.
     */

    var SpectrumDiagram = function() {
      var OVERALL_DIMENSIONS = new Dimension2( 550, 440 );
      var HORIZONTAL_INSET = 30;

      var children = [];

      // Add the title.
      var title = new Text( spectrumWindowTitleString, { font: new PhetFont( 30 ) } );
      children.push( title );

      // Add the frequency arrow.
      var frequencyArrow = new LabeledArrow(
        ( OVERALL_DIMENSIONS.width - HORIZONTAL_INSET * 2 ),
        'right',
        frequencyArrowLabelString,
        Color.WHITE,
        new Color( 225, 5, 255 )
      );
      children.push( frequencyArrow );

      // Add the spectrum portion.
      // LabeledSpectrumNode spectrum = new LabeledSpectrumNode( OVERALL_DIMENSIONS.width - 2 * HORIZONTAL_INSET );
      // spectrum.setOffset( HORIZONTAL_INSET, frequencyArrow.getFullBoundsReference().getMaxY() + 10 );
      // addChild( spectrum );

      // Add the wavelength arrow.
      var wavelengthArrow = new LabeledArrow(
        ( OVERALL_DIMENSIONS.width - HORIZONTAL_INSET * 2 ),
        'left',
        wavelengthArrowLabelString,
        Color.WHITE,
        new Color( 5, 255, 255 )
      );
      children.push( wavelengthArrow );

      // Add the diagram that depicts the wave that gets shorter.
      // ChirpNode decreasingWavelengthNode = new ChirpNode( OVERALL_DIMENSIONS.width - 2 * HORIZONTAL_INSET );
      // decreasingWavelengthNode.setOffset( HORIZONTAL_INSET, wavelengthArrow.getFullBoundsReference().getMaxY() + 20 );
      // addChild( decreasingWavelengthNode );

      return new LayoutBox( { orientation: 'vertical', children: children } )

    };

    /**
     *
     * @param {Number} length
     * @param {String} orientation
     * @param {String} captionText
     * @param {Color} leftColor
     * @param {Color} rightColor
     * @returns {ArrowNode}
     * @constructor
     */
    var LabeledArrow = function( length, orientation, captionText, leftColor, rightColor ) {

      var ARROW_HEAD_HEIGHT = 40;
      var ARROW_HEAD_WIDTH = 40;
      var ARROW_TAIL_WIDTH = 25;
      var LABEL_FONT = new PhetFont( 16 );

      var Orientation = {
        POINTING_LEFT: 'left',
        POINTING_RIGHT: 'right'
      };

      // Create and Add the arrow node.  Arrow direction and fill is dependent on orientation.
      var arrowNode;
      var gradientPaint;
      // Point the node in the right direction.
      if ( orientation === Orientation.POINTING_LEFT ) {
        gradientPaint = new LinearGradient( 0, 0, -length, 0 ).addColorStop( 0, leftColor ).addColorStop( 1, rightColor );
        arrowNode = new ArrowNode( 0, 0, -length, 0, {
            headHeight: ARROW_HEAD_HEIGHT,
            headWidth: ARROW_HEAD_WIDTH,
            tailWidth: ARROW_TAIL_WIDTH,
            fill: gradientPaint,
            lineWidth: 2 }
        );
      }
      else {
        assert && assert( orientation === Orientation.POINTING_RIGHT );
        gradientPaint = new LinearGradient( 0, 0, length, 0 ).addColorStop( 0, leftColor ).addColorStop( 1, rightColor );
        arrowNode = new ArrowNode( 0, 0, length, 0, {
            headHeight: ARROW_HEAD_HEIGHT,
            headWidth: ARROW_HEAD_WIDTH,
            tailWidth: ARROW_TAIL_WIDTH,
            fill: gradientPaint,
            lineWidth: 2 }
        );
      }

      // Create and add the textual label.
      var label = new Text( captionText, { font: LABEL_FONT } );
      label.setCenter( arrowNode.getCenter() );
      arrowNode.addChild( label );

      return arrowNode;

    };

    /**
     * Create a button which closes the spectrum window.  As of right now the behavior of the spectrum window is to
     * close whenever the user clicks in the molecuels and light screen view ( as in AboutDialog ).  This means that no
     * closing listener is necessary.
     *
     * @returns {RectangularPushButton}
     * @constructor
     */
    var CloseButton = function() {

      var content = new Text( spectrumWindowCloseString, { font: new PhetFont( 16 ) } );
      return new RectangularPushButton( { content: content } );

    };

    return inherit( ScreenView, SpectrumWindow );

  }
);

//
//    /**
//     * Class that depicts the frequencies and wavelengths of the EM spectrum
//     * and labels the subsections (e.g. "Infrared").
//     *
//     * @author John Blanco
//     */
//    private static class LabeledSpectrumNode extends PNode {
//
//        private static final double STRIP_HEIGHT = 65;
//        private static final double MIN_FREQUENCY = 1E3;
//        private static final double MAX_FREQUENCY = 1E21;
//        private static final Stroke TICK_MARK_STROKE = new BasicStroke( 2f );
//        private static final double TICK_MARK_HEIGHT = 8;
//        private static final Font TICK_MARK_FONT = new PhetFont( 12 );
//        private static final Stroke BAND_DIVIDER_STROKE = new BasicStroke( 2, BasicStroke.CAP_BUTT,
//                BasicStroke.JOIN_BEVEL, 0, new float[] { 4, 4 }, 0 );
//        private static final Font LABEL_FONT = new PhetFont( 16 );
//
//        private final double stripWidth;
//        private final PNode spectrumRootNode;
//
//        public LabeledSpectrumNode( double width ) {
//            stripWidth = width;
//
//            spectrumRootNode = new PNode();
//            addChild( spectrumRootNode );
//
//            // Create the "strip", which is the solid background portions that
//            // contains the different bands and that has tick marks on the top
//            // and bottom.
//            PNode strip = new PhetPPath( new Rectangle2D.Double( 0, 0, width, STRIP_HEIGHT ), new Color( 237, 243, 246 ),
//                    new BasicStroke( 2f ), Color.BLACK );
//            spectrumRootNode.addChild( strip );
//
//            // Add the frequency tick marks to the top of the spectrum strip.
//            for ( int i = 4; i <= 20; i++ ) {
//                boolean includeLabel = i % 2 == 0;
//                addFrequencyTickMark( Math.pow( 10, i ), includeLabel );
//            }
//
//            // Add the wavelength tick marks.
//            for ( int i = -12; i <= 4; i++ ) {
//                boolean includeLabel = i % 2 == 0;
//                addWavelengthTickMark( Math.pow( 10, i ), includeLabel );
//            }
//
//            // Add the various bands.
//            addBandLabel( 1E3, 1E9, MoleculesAndLightResources.getString( "SpectrumWindow.radioBandLabel" ) );
//            addBandDivider( 1E9 );
//            addBandLabel( 1E9, 3E11, MoleculesAndLightResources.getString( "SpectrumWindow.microwaveBandLabel" ) );
//            addBandDivider( 3E11 );
//            addBandLabel( 3E11, 6E14, MoleculesAndLightResources.getString( "SpectrumWindow.infraredBandLabel" ) );
//            addBandLabel( 1E15, 8E15, MoleculesAndLightResources.getString( "SpectrumWindow.ultravioletBandLabel" ) );
//            addBandDivider( 1E16 );
//            addBandLabel( 1E16, 1E19, MoleculesAndLightResources.getString( "SpectrumWindow.xrayBandLabel" ) );
//            addBandDivider( 1E19 );
//            addBandLabel( 1E19, 1E21, MoleculesAndLightResources.getString( "SpectrumWindow.gammaRayBandLabel" ) );
//
//            // Add the visible spectrum.
//            int visSpectrumWidth = (int) Math.round( getOffsetFromFrequency( 790E12 ) - getOffsetFromFrequency( 400E12 ) );
//            final Image horizontalSpectrum = new ExponentialGrowthSpectrumImageFactory().createHorizontalSpectrum( visSpectrumWidth, (int) STRIP_HEIGHT );
//            BufferedImage flipped = BufferedImageUtils.flipX( BufferedImageUtils.toBufferedImage( horizontalSpectrum ) );
//            PNode visibleSpectrum = new PImage( flipped );
//            visibleSpectrum.setOffset( getOffsetFromFrequency( 400E12 ), 0 );
//            spectrumRootNode.addChild( visibleSpectrum );
//
//            // Add the label for the visible band.
//            PText visibleBandLabel = new PText( MoleculesAndLightResources.getString( "SpectrumWindow.visibleBandLabel" ) );
//            visibleBandLabel.setFont( LABEL_FONT );
//            double visibleBandCenterX = visibleSpectrum.getFullBounds().getCenterX();
//            visibleBandLabel.setOffset( visibleBandCenterX - visibleBandLabel.getFullBoundsReference().width / 2, -50 );
//            spectrumRootNode.addChild( visibleBandLabel );
//
//            // Add the arrow that connects the visible band label to the
//            // visible band itself.
//            ArrowNode visibleBandArrow = new ArrowNode(
//                    new Point2D.Double( visibleBandCenterX, visibleBandLabel.getFullBoundsReference().getMaxY() ),
//                    new Point2D.Double( visibleBandCenterX, 0 ),
//                    7,
//                    7,
//                    2 );
//            visibleBandArrow.setPaint( Color.BLACK );
//            spectrumRootNode.addChild( visibleBandArrow );
//
//            // Add the units.
//            PText frequencyUnits = new PText( MoleculesAndLightResources.getString( "SpectrumWindow.cyclesPerSecondUnits" ) );
//            frequencyUnits.setFont( LABEL_FONT );
//            frequencyUnits.setOffset( stripWidth, -TICK_MARK_HEIGHT - frequencyUnits.getFullBoundsReference().getHeight() );
//            spectrumRootNode.addChild( frequencyUnits );
//            PText wavelengthUnits = new PText( MoleculesAndLightResources.getString( "SpectrumWindow.metersUnits" ) );
//            wavelengthUnits.setFont( LABEL_FONT );
//            wavelengthUnits.setOffset( stripWidth, STRIP_HEIGHT + TICK_MARK_HEIGHT + 5 );
//            spectrumRootNode.addChild( wavelengthUnits );
//
//            // Set the offset of the root node to account for child nodes that
//            // ended up with negative offsets when the layout was complete.
//            spectrumRootNode.setOffset(
//                    Math.max( -spectrumRootNode.getFullBoundsReference().getMinX(), 0 ),
//                    Math.max( -spectrumRootNode.getFullBoundsReference().getMinY(), 0 ) );
//        }
//
//        /**
//         * Convert the given frequency to an offset from the left edge of the
//         * spectrum strip.
//         * @param frequency - Frequency in Hz.
//         */
//        private double getOffsetFromFrequency( double frequency ) {
//            assert frequency >= MIN_FREQUENCY && frequency <= MAX_FREQUENCY;
//            double logarithmicRange = Math.log10( MAX_FREQUENCY ) - Math.log10( MIN_FREQUENCY );
//            double logarithmicFrequency = Math.log10( frequency );
//            return ( logarithmicFrequency - Math.log10( MIN_FREQUENCY ) ) / logarithmicRange * stripWidth;
//        }
//
//        /**
//         * Convert the given wavelength to an offset from the left edge of the
//         * spectrum strip.
//         * @param wavelength - wavelength in meters
//         */
//        private double getOffsetFromWavelength( double wavelength ) {
//            return getOffsetFromFrequency( 299792458 / wavelength );
//        }
//
//        /**
//         * Add a tick mark for the specified frequency.  Frequency tick marks
//         * go on top of the strip.
//         */
//        private void addFrequencyTickMark( double frequency, boolean addLabel ) {
//            // Create and add the tick mark line.
//            DoubleGeneralPath path = new DoubleGeneralPath();
//            path.moveTo( 0, 0 );
//            path.lineTo( 0, -TICK_MARK_HEIGHT );
//            PNode tickMarkNode = new PhetPPath( path.getGeneralPath(), TICK_MARK_STROKE, Color.BLACK );
//            tickMarkNode.setOffset( getOffsetFromFrequency( frequency ), 0 );
//            spectrumRootNode.addChild( tickMarkNode );
//
//            if ( addLabel ) {
//                // Create and add the label.
//                PNode label = createExponentialLabel( frequency );
//                label.setOffset(
//                        tickMarkNode.getFullBoundsReference().getCenterX() - label.getFullBoundsReference().width / 2,
//                        tickMarkNode.getFullBoundsReference().getMinY() - label.getFullBoundsReference().height );
//                spectrumRootNode.addChild( label );
//            }
//        }
//
//        /**
//         * Add a tick mark for the specified frequency.  Frequency tick marks
//         * go on top of the strip.
//         */
//        private void addWavelengthTickMark( double wavelength, boolean addLabel ) {
//            // Create and add the tick mark line.
//            DoubleGeneralPath path = new DoubleGeneralPath();
//            path.moveTo( 0, 0 );
//            path.lineTo( 0, TICK_MARK_HEIGHT );
//            PNode tickMarkNode = new PhetPPath( path.getGeneralPath(), TICK_MARK_STROKE, Color.BLACK );
//            tickMarkNode.setOffset( getOffsetFromWavelength( wavelength ), STRIP_HEIGHT );
//            spectrumRootNode.addChild( tickMarkNode );
//
//            if ( addLabel ) {
//                // Create and add the label.
//                PNode label = createExponentialLabel( wavelength );
//                label.setOffset(
//                        tickMarkNode.getFullBoundsReference().getCenterX() - label.getFullBoundsReference().width / 2,
//                        tickMarkNode.getFullBoundsReference().getMaxY() );
//                spectrumRootNode.addChild( label );
//            }
//        }
//
//        private PNode createExponentialLabel( double value ) {
//            int superscript = (int) Math.round( Math.log10( value ) );
//            HTMLNode label = new HTMLNode( "<html>10<sup>" + superscript + "</sup></html>" );
//            label.setFont( TICK_MARK_FONT );
//            return label;
//        }
//
//        /**
//         * Add a "band divider" at the given frequency.  A band divider is
//         * a dotted line that spans the spectrum strip in the vertical
//         * direction.
//         */
//        private void addBandDivider( double frequency ) {
//            DoubleGeneralPath path = new DoubleGeneralPath();
//            path.moveTo( 0, 0 );
//            path.lineTo( 0, STRIP_HEIGHT );
//            PNode bandDividerNode = new PhetPPath( path.getGeneralPath(), BAND_DIVIDER_STROKE, Color.BLACK );
//            bandDividerNode.setOffset( getOffsetFromFrequency( frequency ), 0 );
//            spectrumRootNode.addChild( bandDividerNode );
//        }
//
//        private void addBandLabel( double lowEndFrequency, double highEndFrequency, String htmlLabelText ) {
//            // Argument validation.
//            assert highEndFrequency >= lowEndFrequency;
//
//            // Set up values needed for calculations.
//            double leftBoundaryX = getOffsetFromFrequency( lowEndFrequency );
//            double rightBoundaryX = getOffsetFromFrequency( highEndFrequency );
//            double width = rightBoundaryX - leftBoundaryX;
//            double centerX = leftBoundaryX + width / 2;
//
//            // Create and add the label.
//            HTMLNode labelNode = new HTMLNode( htmlLabelText );
//            labelNode.setFont( LABEL_FONT );
//            if ( labelNode.getFullBoundsReference().width > width ) {
//                // Scale the label to fit.
//                labelNode.setScale( width / labelNode.getFullBoundsReference().width );
//            }
//            labelNode.setOffset(
//                    centerX - labelNode.getFullBoundsReference().width / 2,
//                    STRIP_HEIGHT / 2 - labelNode.getFullBoundsReference().height / 2 );
//            spectrumRootNode.addChild( labelNode );
//        }
//    }
//
//    /**
//     *  Class that depicts a wave that gets progressively shorter in wavelength
//     * from left to right, which is called a chirp.
//     */
//    private static class ChirpNode extends PNode {
//        public ChirpNode( double width ) {
//            // Create and add the boundary and background.
//            double boundingBoxHeight = width * 0.1; // Arbitrary, adjust as needed.
//            PNode boundingBox = new PhetPPath( new Rectangle2D.Double( 0, 0, width, width * 0.1 ),
//                    new Color( 237, 243, 246 ), new BasicStroke( 2f ), Color.black );
//            addChild( boundingBox );
//
//            // Create the line that represents the decreasing wavelength.
//            DoubleGeneralPath squigglyLinePath = new DoubleGeneralPath(0, 0);
//            int numPointsOnLine = 2000;
//            for ( int i = 0; i < numPointsOnLine; i++ ) {
//                double x = i * ( width / ( numPointsOnLine - 1 ) );
//                double t = x / width;
//
//                double f0 = 1;
//                double k = 2;
//                final double tScale = 4.5;
//                double exponentialSinTerm = Math.sin( 2 * Math.PI * f0 * ( Math.pow( k, t * tScale ) - 1 ) / Math.log( k ) );
//
//                double sinTerm = exponentialSinTerm;
//
//                double y = ( sinTerm * boundingBoxHeight * 0.40 + boundingBoxHeight / 2 );
//                squigglyLinePath.lineTo( x, y );
//            }
//            PNode squigglyLineNode = new PhetPPath( squigglyLinePath.getGeneralPath(),
//                    new BasicStroke( 2, BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND ), Color.BLACK );
//            addChild( squigglyLineNode );
//        }
//    }
//
//    /**
//     * Test harness.
//     */
//    public static void main( String[] args ) {
//        JFrame spectrumWindow = new SpectrumWindow();
//        spectrumWindow.setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
//        spectrumWindow.setLocation( 200, 100 );
//        spectrumWindow.setVisible( true );
//    }
//}

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

    // images
    var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

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

        // Create the flashlight image node, setting the offset such that the
        // center right side of the image is the origin.  This assumes that
        // photons will be emitted horizontally to the right.

        if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.IR_WAVELENGTH ) {
            this.photonEmitterImage = new Image( heatLampImage, { centerX: 0, centerY: 0 } );
            console.log( this.photonEmitterImage.getCenter() );
        }
//        else if ( this.model.getEmittedPhotonWavelength() === WavelengthConstants.VISIBLE_WAVELENGTH ) {
//            this.photonEmitterImage = new Image( PhotonAbsorptionResources.getImage( "flashlight2.png" ) );
//        }
//        else if ( model.getEmittedPhotonWavelength() == WavelengthConstants.UV_WAVELENGTH ) {
//            photonEmitterImage = new PImage( PhotonAbsorptionResources.getImage( "uv_light_2.png" ) );
//        }
//        else if ( model.getEmittedPhotonWavelength() == WavelengthConstants.MICRO_WAVELENGTH ) {
//            photonEmitterImage = new PImage( PhotonAbsorptionResources.getImage( "microwave-transmitter.png" ) );
//        }
//
        this.photonEmitterImage.scale( flashlightWidth / this.photonEmitterImage.getImageWidth() );
        this.photonEmitterImage.setCenterX( -flashlightWidth );
        this.photonEmitterImage.setCenterY(-this.photonEmitterImage.getImageHeight() / 2 );

        this.emitterImageLayer.addChild( this.photonEmitterImage );
    }
    } );
} );

// CONSTRUCTOR

//        // Add the slider that will control the rate of photon emission.
//        Dimension emissionControlSliderSize = new Dimension( 100, 30 ); // This may be adjusted as needed for best look.
//        emissionRateControlSlider = new IntensitySlider( PhetColorScheme.RED_COLORBLIND, IntensitySlider.HORIZONTAL, emissionControlSliderSize );
//        emissionRateControlSlider.setMinimum( 0 );
//        emissionRateControlSlider.setMaximum( SLIDER_RANGE );
//        emissionRateControlSlider.addChangeListener( new ChangeListener() {
//            public void stateChanged( ChangeEvent e ) {
//                double sliderProportion = (double) emissionRateControlSlider.getValue() / (double) SLIDER_RANGE;
//                if ( sliderProportion == 0 ) {
//                    model.setPhotonEmissionPeriod( Double.POSITIVE_INFINITY );
//                }
//                else if ( model.getPhotonTarget() == PhotonTarget.CONFIGURABLE_ATMOSPHERE ) {
//                    // Note the implicit conversion from frequency to period in the following line.
//                    model.setPhotonEmissionPeriod(
//                            PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET / sliderProportion );
//                }
//                else {
//                    // Note the implicit conversion from frequency to period in the following line.
//                    model.setPhotonEmissionPeriod(
//                            PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET / sliderProportion );
//                }
//            }
//        } );
//
//        EmissionRateControlSliderNode emissionRateControlSliderNode = new EmissionRateControlSliderNode( model );
//        PBounds emitterImageBounds = photonEmitterImage.getFullBoundsReference();
//        emissionRateControlSliderNode.setOffset(
//                emitterImageBounds.getCenterX() - emissionRateControlSliderNode.getFullBoundsReference().getWidth() / 2,
//                emitterImageBounds.getCenterY() - emissionRateControlSliderNode.getFullBoundsReference().getHeight() / 2 );
//
//        emissionControlSliderLayer.addChild( emissionRateControlSliderNode );
//    }
//
//
//    // ------------------------------------------------------------------------
//    // Inner Classes and Interfaces
//    // ------------------------------------------------------------------------
//
//    /**
//     * Class that implements the slider that is used to control the emission
//     * rate of photons.  The slider will update its background color based on
//     * the emission wavelength, and will adjust its position as the
//     * corresponding setting in the model changes.
//     *
//     * @author John Blanco
//     */
//    private static class EmissionRateControlSliderNode extends PNode {
//
//        private final PhotonAbsorptionModel model;
//        private final IntensitySlider emissionRateControlSlider;
//
//        public EmissionRateControlSliderNode( final PhotonAbsorptionModel model ) {
//
//            this.model = model;
//
//            // Listen to the model for events that may cause this node to change
//            // state.
//            this.model.addListener( new PhotonAbsorptionModel.Adapter() {
//                @Override
//                public void emittedPhotonWavelengthChanged() {
//                    update();
//                }
//
//                @Override
//                public void photonEmissionPeriodChanged() {
//                    update();
//                }
//            } );
//
//            Dimension emissionControlSliderSize = new Dimension( 100, 30 ); // This may be adjusted as needed for best look.
//            emissionRateControlSlider = new IntensitySlider( Color.RED, IntensitySlider.HORIZONTAL, emissionControlSliderSize ) {{
//                setMinimum( 0 );
//                setMaximum( SLIDER_RANGE );
//                addChangeListener( new ChangeListener() {
//                    public void stateChanged( ChangeEvent e ) {
//                        double sliderProportion = (double) emissionRateControlSlider.getValue() / (double) SLIDER_RANGE;
//                        if ( sliderProportion == 0 ) {
//                            model.setPhotonEmissionPeriod( Double.POSITIVE_INFINITY );
//                        }
//                        else if ( model.getPhotonTarget() == PhotonTarget.CONFIGURABLE_ATMOSPHERE ) {
//                            // Note the implicit conversion from frequency to period in the following line.
//                            model.setPhotonEmissionPeriod( PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET / sliderProportion );
//                        }
//                        else {
//                            // Note the implicit conversion from frequency to period in the following line.
//                            model.setPhotonEmissionPeriod( PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET / sliderProportion );
//                        }
//                    }
//                } );
//            }};
//
//            PSwing emissionRateControlSliderPSwing = new PSwing( emissionRateControlSlider );
//            addChild( emissionRateControlSliderPSwing );
//        }
//
//        private void update() {
//            // Adjust the position of the slider.  Note that we do a conversion
//            // between period and frequency and map it into the slider's range.
//            int mappedFrequency;
//            if ( model.getPhotonTarget() == PhotonTarget.CONFIGURABLE_ATMOSPHERE ) {
//                mappedFrequency = (int) Math.round( PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET /
//                    model.getPhotonEmissionPeriod() * SLIDER_RANGE );
//            }
//            else {
//                mappedFrequency = (int) Math.round( PhotonAbsorptionModel.MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET /
//                    model.getPhotonEmissionPeriod() * SLIDER_RANGE );
//            }
//
//            emissionRateControlSlider.setValue( mappedFrequency );
//
//            // Update the color of the slider.
//            if ( model.getEmittedPhotonWavelength() == WavelengthConstants.IR_WAVELENGTH ) {
//                emissionRateControlSlider.setColor( PhetColorScheme.RED_COLORBLIND );
//            }
//            else if ( model.getEmittedPhotonWavelength() == WavelengthConstants.VISIBLE_WAVELENGTH ) {
//                emissionRateControlSlider.setColor( Color.YELLOW );
//            }
//            else if ( model.getEmittedPhotonWavelength() == WavelengthConstants.UV_WAVELENGTH ) {
//                emissionRateControlSlider.setColor( new Color( 200, 0, 200 ) );
//            }
//            else if ( model.getEmittedPhotonWavelength() == WavelengthConstants.MICRO_WAVELENGTH ) {
//                emissionRateControlSlider.setColor( new Color( 200, 200, 200 ) );
//            }
//            else {
//                System.err.println( getClass().getName() + "- Error: Unrecognized photon." );
//            }
//        }
//    }
//}

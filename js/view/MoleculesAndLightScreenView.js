//  Copyright 2002-2014, University of Colorado Boulder

/**
 * View for Molecules and Light
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 *
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var PAPhotonNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PAPhotonNode' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/photon' ); // TODO: Temporary dependency module for testing.
  var QuadEmissionFrequencyControlPanel = require( 'MOLECULES_AND_LIGHT/view/QuadEmissionFrequencyControlPanel' );

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  /**
   * @param {BarMagnetModel} photonAbsorptionModel
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel ) {

    ScreenView.call( this );

    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Math.round( 786 * 0.65 ), Math.round( 786 * 0.35 ) ),
      0.18 );

    this.mvt = mvt; // Make mvt available to descendant types.

    // TODO: These are convenience commands to print the photon wavelength constants.  Remove this soon.
    var testPhotonNode = new PAPhotonNode( new Photon( 20 ), mvt );
    testPhotonNode.printWavelengthConstants();
    photonAbsorptionModel.photons.add( new Photon( 750 ) );

    // Add the heat lamp to the left center of screen
    var heatLampNode = new Image( heatLampImage, { left: 0, centerY: this.layoutBounds.centerY, scale: 0.75 } );
    this.addChild( heatLampNode );
    this.addChild( new QuadEmissionFrequencyControlPanel( photonAbsorptionModel, {top: heatLampNode.bottom + 100, left: 20} ) );
    this.addChild( new PAPhotonNode( new Photon( 20 ), mvt ) );

    this.addChild( new PAPhotonNode(photonAbsorptionModel.testPhoton, mvt));

  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
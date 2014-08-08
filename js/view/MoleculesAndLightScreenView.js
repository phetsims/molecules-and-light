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
      new Vector2( this.layoutBounds.width * 0.375, this.layoutBounds.height * 0.79 ),
      105 );

    this.mvt = mvt; // Make mvt available to descendant types.

    // Add the heat lamp to the left center of screen
    var heatLampNode = new Image( heatLampImage, { left: 0, centerY: this.layoutBounds.centerY, scale: 0.75 } );
    this.addChild( heatLampNode );
    this.addChild( new QuadEmissionFrequencyControlPanel( photonAbsorptionModel, {top: heatLampNode.bottom + 100, left: 20} ) );
    this.addChild( new PAPhotonNode( new Photon( 20 ), mvt ) );
  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
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
  var QuadEmissionFrequencyControlPanel = require( 'MOLECULES_AND_LIGHT/view/QuadEmissionFrequencyControlPanel' );

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  /**
   * @param {BarMagnetModel} photonAbsorptionModel
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel ) {

    ScreenView.call( this );

    // Add the heat lamp to the left center of screen
    var heatLampNode = new Image( heatLampImage, { left: 0, centerY: this.layoutBounds.centerY, scale: 0.75 } );
    this.addChild( heatLampNode );
    this.addChild( new QuadEmissionFrequencyControlPanel( photonAbsorptionModel, {top: heatLampNode.bottom + 100, left: 20} ) );
  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
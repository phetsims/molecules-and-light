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

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  /**
   * @param {BarMagnetModel} model
   * @constructor
   */
  function MoleculesAndLightScreenView( model ) {

    ScreenView.call( this );

    // Add the heat lamp to the left center of screen
    this.addChild( new Image( heatLampImage, { left: 0, centerY: this.layoutBounds.centerY, scale: 0.75 } ) );

  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
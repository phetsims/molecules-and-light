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

  /**
   * @param {BarMagnetModel} model
   * @constructor
   */
  function MoleculesAndLightScreenView( model ) {

    var thisView = this;
    ScreenView.call( thisView );

  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
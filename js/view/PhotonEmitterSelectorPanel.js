//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Selector panel for a photon emitter.  This will construct one of the panels to be used in the full Emission Frequency
 * control panel.
 *
 * @author Jesse Greenberg ( PhET Interactive Simulations )
 */

define( function( require ) {
  'use strict';

  // Modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );

  /**
   * Constructor for a photon emitter panel.  This is a single panel for the emission frequency control panel.
   *
   * @param {Image} emitterImage
   * @param {PAPhotonNode} photonNode
   * @constructor
   */
  function PhotonEmitterSelectorPanel( emitterImage, photonNode ) {
    emitterImage.scale( 0.15 );
    LayoutBox.call( this, { orientation: 'horizontal', spacing: 10, children: [ emitterImage, photonNode ] } );
  }

  return inherit( LayoutBox, PhotonEmitterSelectorPanel );
} );

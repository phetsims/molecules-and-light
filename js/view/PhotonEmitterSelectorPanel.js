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
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * Constructor for a photon emitter panel.  This is a single panel for the emission frequency control panel.
   *
   * @param { String } emitterName
   * @param( Image } emitterImage
   * @param( PAPhotonNode } photonNode
   * @param { Object } options
   * @constructor
   */
  function PhotonEmitterSelectorPanel( emitterName, emitterImage, photonNode, options) {

    options = _.extend( {
      // defaults
      stroke: null,
      fill: 'black',
      lineWidth: 3
    }, options );

    // Supertype constructor
    Rectangle.call( this, 0, 0, 150, 80, options );

    // Scale the emitter and place it in the center of the panel.
    emitterImage.scale( 0.25 );
    emitterImage.setCenterY( this.getCenterY() );

    // Place the photon node to the right of the emitter.
    photonNode.setCenter( new Vector2( emitterImage.getRight() + 20, this.getCenterY() ) );

    // Text containing the molecule name and a  bbreviation
    var font = new PhetFont( { size: 18, family: 'Sans-serif' } );
    var emitterTitle = new Text( emitterName, { font: font } );
    emitterTitle.setCenterY( 100 );

    // Add the emitter image and emitter name to the rectangle.
    this.addChild( emitterImage );
    this.addChild( emitterTitle );
    this.addChild( photonNode );

  }

  return inherit( Rectangle, PhotonEmitterSelectorPanel );

} );

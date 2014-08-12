define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );

  // images
  var microwavePhotonImage = require( 'image!MOLECULES_AND_LIGHT/microwave-photon.png' );
  var photon660Image = require( 'image!MOLECULES_AND_LIGHT/photon-660.png' );
  var thin2Image = require( 'image!MOLECULES_AND_LIGHT/thin2.png' );
  var photon100Image = require( 'image!MOLECULES_AND_LIGHT/photon-100.png' );

  /**
   * @param {BarMagnet} barMagnet
   * @param {ModelViewTransform2} mvt
   */

// Map of photon wavelengths to visual images used for representing them.
  var mapWavelengthToImageName = {};
  mapWavelengthToImageName[ WavelengthConstants.MICRO_WAVELENGTH ] = microwavePhotonImage;
  mapWavelengthToImageName[ WavelengthConstants.IR_WAVELENGTH ] = photon660Image;
  mapWavelengthToImageName[ WavelengthConstants.VISIBLE_WAVELENGTH ] = thin2Image;
  mapWavelengthToImageName[ WavelengthConstants.UV_WAVELENGTH ] = photon100Image;

  function PAPhotonNode( photon, mvt ) {

    // supertype constructor
    Node.call( this );
    // Cary this node through the scope in nested functions.
    var thisNode = this;

    this.photon = photon;
//  this.photon.addObserver( this );
    this.mvt = mvt;

    console.log( mvt );

    // lookup the image file that corresponds to the wavelength and add a centered image.
    assert && assert( mapWavelengthToImageName.hasOwnProperty( this.photon.getWavelength() ) );
    this.photonImage = new Image( mapWavelengthToImageName[ this.photon.getWavelength() ], { centerX: 0, centerY: 0 } );

    // Function for updating position.
    function updatePosition() {
      // Set overall position.  Recall that positions in the model are defined
      // as the center bottom of the item.
      thisNode.centerX = mvt.modelToViewX( photon.getLocation().x );
      thisNode.bottom = mvt.modelToViewY( photon.getLocation().y );
      console.log( thisNode.center );
    }

    this.addChild( this.photonImage );

    // Observe position changes.
    photon.locationProperty.link( function() {
      updatePosition();
    } );

  }

  return inherit( Node, PAPhotonNode, {

      /**
       * Testing method to print the map of photon wavelength constants.  Also testing
       * Object.getOwnPropertyNames and hasOwnProperty().  This should be removed soon.
       */
      printWavelengthConstants: function() {
        console.log( Object.getOwnPropertyNames( mapWavelengthToImageName ) );
        console.log( Object.hasOwnProperty( 'randomvalue' ) );
        console.log( mapWavelengthToImageName.hasOwnProperty( '20' ) );
      }
    }
  )

} );

//// ------------------------------------------------------------------------
//// Constructor(s)
//// ------------------------------------------------------------------------
//
///**
// * Construct a photon node given only a wavelength.  This is intended for
// * use in places like control panels in the play area, where the node is
// * needed but doesn't really correspond to anything in the model.
// */
//public PAPhotonNode( double wavelength ) {
//  this( new Photon( wavelength ), new ModelViewTransform2D() );
//}


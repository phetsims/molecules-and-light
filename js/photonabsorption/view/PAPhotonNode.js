define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );

  // images
  var microwavePhotonImage = require( 'image!EXAMPLE_SIM/barMagnet.png' );
  var photon660Image = require( 'image!EXAMPLE_SIM/barMagnet.png' );
  var thin2Image = require( 'image!EXAMPLE_SIM/barMagnet.png' );
  var photon100Image = require( 'image!EXAMPLE_SIM/barMagnet.png' );

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

  }

  return inherit( Node, PAPhotonNode );
} );


//// ------------------------------------------------------------------------
//// Instance Data
//// ------------------------------------------------------------------------

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
//
///**
// * Primary constructor.
// */
//public PAPhotonNode( Photon photon, ModelViewTransform2D mvt ) {
//
//  this.photon = photon;
//  this.photon.addObserver( this );
//  this.mvt = mvt;
//
//  // lookup the image file that corresponds to the wavelength
//  assert mapWavelengthToImageName.containsKey( photon.getWavelength() );
//  photonImage = new PImage( PhotonAbsorptionResources.getImage( mapWavelengthToImageName.get( photon.getWavelength() ) ) );
//
//  // center the image
//  photonImage.setOffset( -photonImage.getFullBoundsReference().width / 2,
//      -photonImage.getFullBoundsReference().height / 2 );
//  addChild( photonImage );
//  updatePosition();
//}
//
//// ------------------------------------------------------------------------
//// Methods
//// ------------------------------------------------------------------------
//
//public void update( Observable o, Object arg ) {
//  updatePosition();
//}
//
//private void updatePosition() {
//  setOffset( mvt.modelToViewDouble( photon.getLocation() ) );
//}

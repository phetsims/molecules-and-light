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
  var PhotonEmitterNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PhotonEmitterNode' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/photon' ); // TODO: Temporary dependency module for testing.
  var QuadEmissionFrequencyControlPanel = require( 'MOLECULES_AND_LIGHT/view/QuadEmissionFrequencyControlPanel' );
  var CO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO' );
  var NO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO' );
  var NO2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO2' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/MoleculeNode' );

  // images
  var heatLampImage = require( 'image!MOLECULES_AND_LIGHT/heat-lamp.png' );

  /**
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel ) {
    var moleculesAndLightScreenView = this;
    ScreenView.call( this );

    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Math.round( 786 * 0.65 ), Math.round( 786 * 0.35 ) ),
      0.18 );

    this.mvt = mvt; // Make mvt available to descendant types.

    photonAbsorptionModel.photons.addItemAddedListener( function( photon ) {
      moleculesAndLightScreenView.addChild( new PAPhotonNode(photon, mvt));

    } );

    // TODO: These are convenience commands to print the photon wavelength constants.  Remove this soon.
    //var testPhotonNode = new PAPhotonNode( new Photon( 20 ), mvt );
    //testPhotonNode.printWavelengthConstants();
    //photonAbsorptionModel.photons.add( new Photon( 20 ) );

    // Add the heat lamp to the left center of screen
    //var heatLampNode = new Image( heatLampImage, { left: 0, centerY: this.layoutBounds.centerY, scale: 0.75 } );
    var heatLampNode = new PhotonEmitterNode( 300, this.mvt, photonAbsorptionModel );
    this.addChild( heatLampNode );

    // Add the control panel for photon type
    //this.addChild( new QuadEmissionFrequencyControlPanel( photonAbsorptionModel, {top: heatLampNode.bottom + 100, left: 20} ) );

    // Add a photon to the screen.
    this.addChild( new PAPhotonNode(photonAbsorptionModel.testPhoton, mvt ) );
    // Add a molecule to the screen.
    this.addChild( new MoleculeNode( new NO2( { initialCenterOfGravityPos: new Vector2( 50, 50 ) }), mvt) );


  }

  return inherit( ScreenView, MoleculesAndLightScreenView );
} );
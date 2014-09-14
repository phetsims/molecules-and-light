//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Molecules and Light viewing window which holds the play area for this application.  This is where the photon
 * emitters, photons, and molecules of the photonAbsorptionModel will exist and interact.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var PAPhotonNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PAPhotonNode' );
  var PhotonEmitterNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/PhotonEmitterNode' );
  var CO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO' );
  var NO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO' );
  var NO2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/NO2' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photonabsorption/view/MoleculeNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Color = require( 'SCENERY/util/Color' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PhotonAbsorptionModel = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionModel' );
  var Property = require( 'AXON/Property' );

  // Class data for the Application Window.
  // Model-view transform for intermediate coordinates.
  var INTERMEDIATE_RENDERING_SIZE = new Dimension2( 786, 786 );
  var PHOTON_EMITTER_WIDTH = 125;

  /**
   * Constructor for a Molecules and Light application window.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function MoleculesAndLightApplicationWindow( photonAbsorptionModel, mvt ) {

    // Supertype constructor
    Rectangle.call( this, 0, 0, 500, 300, {fill: 'black' } );

    // Allow this view window to be called on through nested functions.
    var thisWindow = this;
    this.mvt = mvt;

    // The center of this window seems to be changing once I emit photons and I cannot find out why.
    // This will keep track of the initial value.  TODO: Find out why this is.
    this.centerVal = this.getCenter();

    // Add the layers for molecules, photons, and photon emitters.
    this.moleculeLayer = new Node();
    this.addChild( this.moleculeLayer );
    this.photonLayer = new Node();
    this.addChild( this.photonLayer );
    this.photonEmitterLayer = new Node();
    this.addChild( this.photonEmitterLayer );

    // Create the photon emitter.
    var photonEmitterNode = new PhotonEmitterNode( PHOTON_EMITTER_WIDTH, mvt, photonAbsorptionModel );
    photonEmitterNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );

    // Set up an event listener for adding and removing molecules.
    photonAbsorptionModel.activeMolecules.addItemAddedListener( function( addedMolecule ) {
      var moleculeNode = new MoleculeNode( addedMolecule, thisWindow.mvt ); //Create the molecule node.
      moleculeNode.scale( 0.65 );
      moleculeNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getSingleMoleculePosition() ) );
      thisWindow.moleculeLayer.addChild( moleculeNode );

      photonAbsorptionModel.activeMolecules.addItemRemovedListener( function removalListener( removedMolecule ) {
        if ( removedMolecule === addedMolecule ) {
          thisWindow.moleculeLayer.removeChild( moleculeNode );
          photonAbsorptionModel.activeMolecules.removeItemRemovedListener( removalListener );
        }
      } );
    } );

    // Set up the event listeners for adding and removing photons.
    photonAbsorptionModel.photons.addItemAddedListener( function( addedPhoton ) {
      var photonNode = new PAPhotonNode( addedPhoton, thisWindow.mvt );
      thisWindow.photonLayer.addChild( photonNode );

      photonAbsorptionModel.photons.addItemRemovedListener( function removalListener( removedPhoton ) {
        if ( removedPhoton === addedPhoton ) {
          thisWindow.photonLayer.removeChild( photonNode );
          photonAbsorptionModel.photons.removeItemRemovedListener( removalListener );
        }
      } );
    } );

    // Add the photon emitter.
    this.photonEmitterLayer.addChild( photonEmitterNode );
  }

  return inherit( Rectangle, MoleculesAndLightApplicationWindow );

} );
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
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Strings
  var returnMoleculeString = require( 'string!MOLECULES_AND_LIGHT/buttonNode.returnMolecule' );

  // Class data for the Application Window
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

    var thisWindow = this;
    this.mvt = mvt;
    this.photonAbsorptionModel = photonAbsorptionModel;

    // Add the layers for molecules, photons, and photon emitters.
    this.moleculeLayer = new Node();
    this.addChild( this.moleculeLayer );

    this.photonLayer = new Node();
    this.addChild( this.photonLayer );

    this.photonEmitterLayer = new Node();
    this.addChild( this.photonEmitterLayer );


    // Create and add the photon emitter.
    this.photonEmitterNode = new PhotonEmitterNode( PHOTON_EMITTER_WIDTH, mvt, photonAbsorptionModel );
    this.photonEmitterNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );
    this.photonEmitterLayer.addChild( this.photonEmitterNode );

    // Add the button for restoring molecules that break apart.
    this.restoreMoleculeButtonNode = new RectangularPushButton( {
      content: new Text( returnMoleculeString ),
      baseColor: new Color( 255, 144, 0 ),
      listener: function() { photonAbsorptionModel.restorePhotonTarget() }
    } );

    this.restoreMoleculeButtonNode.setCenter( new Vector2( this.width - this.restoreMoleculeButtonNode.width,
        this.restoreMoleculeButtonNode.height + 10 ) );

    this.addChild( this.restoreMoleculeButtonNode );
    this.updateRestoreMoleculeButtonVisibility();

    // Set up an event listener for adding and removing molecules.
    photonAbsorptionModel.activeMolecules.addItemAddedListener( function( addedMolecule ) {
      var moleculeNode = new MoleculeNode( addedMolecule, thisWindow.mvt ); //Create the molecule node.
      moleculeNode.scale( 0.65 ); // Scale appropriately for the window.

      moleculeNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getSingleMoleculePosition() ) );
      thisWindow.moleculeLayer.addChild( moleculeNode );

      // Watch the molecule position and update restore molecule button visibility.
      addedMolecule.centerOfGravityProperty.link( function() {
        thisWindow.updateRestoreMoleculeButtonVisibility();
      } );

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
      photonNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );
      thisWindow.photonLayer.addChild( photonNode );

      // Watch photon positions and determine if photon should be removed from window.
      addedPhoton.locationProperty.link( function() {
        thisWindow.checkPhotonBounds();
      });

      photonAbsorptionModel.photons.addItemRemovedListener( function removalListener( removedPhoton ) {
        if ( removedPhoton === addedPhoton ) {
          thisWindow.photonLayer.removeChild( photonNode );
          photonAbsorptionModel.photons.removeItemRemovedListener( removalListener );
        }
      } );
    } );

  }

  return inherit( Rectangle, MoleculesAndLightApplicationWindow, {

    /**
     * Update the visibility of the button that restores molecules that have broken apart.  This button should be
     * visible only when one or more molecules are off the screen (more or less).  This routine uses the intermediate
     * rendering size to make the determination, which isn't perfectly accurate, but works well enough for our purposes.
     */
    updateRestoreMoleculeButtonVisibility: function() {
      var restoreButtonVisible = false;
      for ( var molecule = 0; molecule < this.photonAbsorptionModel.activeMolecules.length; molecule++ ) {
        if ( !this.containsPointSelf( this.mvt.modelToViewPosition( this.photonAbsorptionModel.activeMolecules.get( molecule ).getCenterOfGravityPos() ) ) ) {
          restoreButtonVisible = true;
          break;
        }
      }
      this.restoreMoleculeButtonNode.setVisible( restoreButtonVisible );
    },

    /**
     * Check to see if any photons are outside the application window.
     */
    checkPhotonBounds: function() {
      var photonsToRemove = [];
      for ( var photon = 0; photon < this.photonAbsorptionModel.photons.length; photon++ ) {
        if ( !this.containsPoint( this.mvt.modelToViewPosition( this.photonAbsorptionModel.photons.get( photon ).getLocation() ) ) ) {
          photonsToRemove.push( this.photonAbsorptionModel.photons.get( photon ) );
        }
      }

      this.photonAbsorptionModel.photons.removeAll( photonsToRemove );
    }
  } )
} );
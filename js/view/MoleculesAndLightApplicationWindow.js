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
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var WindowFrameNode = require( 'MOLECULES_AND_LIGHT/view/WindowFrameNode' );

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
    Rectangle.call( this, 0, 0, 500, 300, 7, 7, {fill: 'black'} );

    var thisWindow = this;
    this.mvt = mvt;
    this.photonAbsorptionModel = photonAbsorptionModel;

    this.restoreButtonVisibleProperty = new Property( false );

    // Add the layers for molecules, photons, and photon emitters.
    this.moleculeLayer = new Node();
    this.addChild( this.moleculeLayer );

    this.photonLayer = new Node();
    this.addChild( this.photonLayer );

    this.photonEmitterLayer = new Node();
    this.addChild( this.photonEmitterLayer );

    // Add the frame around the application window.
    var windowFrame = this.drawBorder( 5, new Color( "#BED0E7" ), new Color( '#4070CE' ) );
    this.addChild( windowFrame );

    // Create and add the photon emitter.
    this.photonEmitterNode = new PhotonEmitterNode( PHOTON_EMITTER_WIDTH, mvt, photonAbsorptionModel );
    this.photonEmitterNode.setCenter( mvt.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );
    this.photonEmitterLayer.addChild( this.photonEmitterNode );

    // Add the button for restoring molecules that break apart.
    this.restoreMoleculeButtonNode = new RectangularPushButton( {
      content: new Text( returnMoleculeString ),
      baseColor: new Color( 255, 144, 0 ),
      listener: function() {
        photonAbsorptionModel.restorePhotonTarget();
        thisWindow.restoreButtonVisibleProperty.set( false );
        thisWindow.moleculeCheckBounds();
      }
    } );

    this.restoreMoleculeButtonNode.setCenter( new Vector2( this.width - this.restoreMoleculeButtonNode.width,
        this.restoreMoleculeButtonNode.height + 10 ) );

    this.addChild( this.restoreMoleculeButtonNode );
    this.moleculeCheckBounds();

    // Set up an event listener for adding and removing molecules.
    photonAbsorptionModel.activeMolecules.addItemAddedListener( function( addedMolecule ) {
      var moleculeNode = new MoleculeNode( addedMolecule, thisWindow.mvt ); //Create the molecule node.
      thisWindow.moleculeLayer.addChild( moleculeNode );

      // Determine if it is time to remove molecule and update restore molecule button visibility.
      addedMolecule.centerOfGravityProperty.link( function() {
        thisWindow.moleculeCheckBounds();
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
        thisWindow.photonCheckBounds();
      } );

      photonAbsorptionModel.photons.addItemRemovedListener( function removalListener( removedPhoton ) {
        if ( removedPhoton === addedPhoton ) {
          thisWindow.photonLayer.removeChild( photonNode );
          photonAbsorptionModel.photons.removeItemRemovedListener( removalListener );
        }
      } );
    } );

    // If the molecule control panel is used, remove the restore molecule button.
    this.photonAbsorptionModel.photonTargetProperty.link( function() {
      thisWindow.restoreButtonVisibleProperty.set( false );
    } )

  }

  return inherit( Rectangle, MoleculesAndLightApplicationWindow, {

    /**
     * Update the visibility of the button that restores molecules that have broken apart.  This button should be
     * visible only when one or more molecules are off the screen (more or less).
     */
    moleculeCheckBounds: function() {
      var moleculesToRemove = [];
      for ( var molecule = 0; molecule < this.photonAbsorptionModel.activeMolecules.length; molecule++ ) {
        if ( !this.containsPointSelf( this.mvt.modelToViewPosition( this.photonAbsorptionModel.activeMolecules.get( molecule ).getCenterOfGravityPos() ) ) ) {
          moleculesToRemove.push( this.photonAbsorptionModel.activeMolecules.get( molecule ) );
          this.restoreButtonVisibleProperty.set( true );
          break;
        }
      }
      this.restoreMoleculeButtonNode.setVisible( this.restoreButtonVisibleProperty.get() );
      this.photonAbsorptionModel.activeMolecules.removeAll( moleculesToRemove );
    },

    /**
     * Check to see if any photons collide with the application window.  If there is a collision, remove the photon
     * from the model.
     *
     */
    photonCheckBounds: function() {
      var photonsToRemove = [];
      for ( var photon = 0; photon < this.photonAbsorptionModel.photons.length; photon++ ) {
        if ( !this.containsPointSelf( this.mvt.modelToViewPosition( this.photonAbsorptionModel.photons.get( photon ).getLocation() ) ) ) {
          photonsToRemove.push( this.photonAbsorptionModel.photons.get( photon ) );
        }
      }
      this.photonAbsorptionModel.photons.removeAll( photonsToRemove );
    },

    /**
     * Draw a border around the application window.  The desired border has a color gradient which cannot be done in a
     * normal stroke. TODO: Move this function to the WindowFrameNode.js which uses canvas directly.
     *
     * @param { Number } lineWidth - The width of the border.  Similar to lineWidth in Rectangle.js.
     * @param { Color } innerColor - The color directly outside the application window.  First color in the gradient.
     * @param { Color } outerColor - The final color of the stroke.  'Destination' color of the gradient.
     * @return {Node} applicationFrame
     */
    drawBorder: function( lineWidth, innerColor, outerColor ) {
      // Declare the entire frame.
      var applicationFrame = new Node();

      /**
       * Function which creates the sections of the frame which span the width.  These sections will form the top and
       * bottom of the border.  The top and bottom sections of the frame are identical except for being rotated 180
       * degrees and translated to their respective edges.
       *
       * @param { MoleculesAndLightApplicationWindow } window
       * @returns {Rectangle}
       */
      var drawBorderWidth = function( window ) {
        var widthFill = new LinearGradient( 0, 0, 0, lineWidth ).addColorStop( 0, outerColor ).addColorStop( 1, innerColor );
        return new Rectangle( 0, 0, window.rectWidth - 2 * window.rectArcWidth, lineWidth, { fill: widthFill } );
      };

      var drawBorderHeight = function( window ) {
        var heightFill = new LinearGradient( 0, 0, lineWidth, 0 ).addColorStop( 0, outerColor ).addColorStop( 1, innerColor );
        return new Rectangle( 0, 0, lineWidth, window.rectHeight - 2 * window.rectArcHeight, { fill: heightFill } );
      };

      // Draw the top section of the frame.
      var borderTop = new drawBorderWidth( this );
      borderTop.setLeftBottom( new Vector2( this.leftTop.x + this.rectArcWidth, this.leftTop.y ) );
      applicationFrame.addChild( borderTop );

      // Draw the bottom section of the frame.
      var borderBottom = new drawBorderWidth( this );
      borderBottom.rotate( Math.PI ); // Rotate this frame piece by 180 degrees.
      borderBottom.setLeftTop( new Vector2( this.leftBottom.x + this.rectArcWidth, this.leftBottom.y ) );
      this.addChild( borderBottom );

      // Draw the left section of the frame.
      var borderLeft = new drawBorderHeight( this );
      borderLeft.setRightTop( new Vector2( this.leftTop.x, this.leftTop.y + this.rectArcHeight ) );
      applicationFrame.addChild( borderLeft );

      // Draw the right section of the frame.
      var borderRight = new drawBorderHeight( this );
      borderRight.rotate( Math.PI ); // Rotate this frame piece by 180 degrees.
      borderRight.setLeftTop( new Vector2( this.rightTop.x, this.rightTop.y + this.rectArcHeight ) );
      applicationFrame.addChild( borderRight );

      // Draw the windowframe.
      var borderLeftTopCorner = new WindowFrameNode( this, lineWidth, innerColor, outerColor );
      applicationFrame.addChild( borderLeftTopCorner );

      // Return the finished frame.
      return applicationFrame;

    }
  } )
} );
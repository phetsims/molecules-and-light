// Copyright 2014-2017, University of Colorado Boulder

/**
 * Window for Molecules And Light which holds the photon emitter, photons, and molecules of the photon absorption model.
 * This is where the user observes interactions between photons and molecules.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  // var Shape = require( 'KITE/Shape' );  // See below for comment on temporary replacement of clipArea shape.
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/MoleculeNode' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var MoleculesAndLightA11yStrings = require( 'MOLECULES_AND_LIGHT/common/MoleculesAndLightA11yStrings' );
  var Node = require( 'SCENERY/nodes/Node' );
  var platform = require( 'PHET_CORE/platform' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PhotonEmitterNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/PhotonEmitterNode' );
  var PhotonNode = require( 'MOLECULES_AND_LIGHT/photon-absorption/view/PhotonNode' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhotonTarget = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/PhotonTarget' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants');
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );

  // strings
  var buttonNodeReturnMoleculeString = require( 'string!MOLECULES_AND_LIGHT/ButtonNode.ReturnMolecule' );
  var controlPanelCarbonDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonDioxide' );
  var controlPanelCarbonMonoxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.CarbonMonoxide' );
  var controlPanelNitrogenDioxideString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.NitrogenDioxide' );
  var controlPanelNitrogenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Nitrogen' );
  var controlPanelOxygenString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Oxygen' );
  var controlPanelOzoneString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Ozone' );
  var controlPanelWaterString = require( 'string!MOLECULES_AND_LIGHT/ControlPanel.Water' );
  // var molecularNamePatternString = require( 'string!MOLECULES_AND_LIGHT/molecularNamePattern' );

  // a11y strings
  var observationWindowDescriptionPatternString = MoleculesAndLightA11yStrings.observationWindowDescriptionPatternString.value;
  var isOffAndPointsString = MoleculesAndLightA11yStrings.isOffAndPointsString.value;
  var emitsPhotonsString = MoleculesAndLightA11yStrings.emitsPhotonsString.value;
  var aString = MoleculesAndLightA11yStrings.aString.value;
  var anString = MoleculesAndLightA11yStrings.anString.value;
  var returnMoleculeString = MoleculesAndLightA11yStrings.returnMoleculeString.value;
  var returnMoleculeHelpString = MoleculesAndLightA11yStrings.returnMoleculeHelpString.value;

  // maps photon target to translatable string
  var getMoleculeName = function( photonTarget ) {
    return photonTarget === PhotonTarget.SINGLE_CO_MOLECULE ? controlPanelCarbonMonoxideString :
           photonTarget === PhotonTarget.SINGLE_N2_MOLECULE ? controlPanelNitrogenString :
           photonTarget === PhotonTarget.SINGLE_O2_MOLECULE ? controlPanelOxygenString :
           photonTarget === PhotonTarget.SINGLE_CO2_MOLECULE ? controlPanelCarbonDioxideString :
           photonTarget === PhotonTarget.SINGLE_NO2_MOLECULE ? controlPanelNitrogenDioxideString :
           photonTarget === PhotonTarget.SINGLE_H2O_MOLECULE ? controlPanelWaterString :
           photonTarget === PhotonTarget.SINGLE_O3_MOLECULE ? controlPanelOzoneString :
           assert( false, 'unknown' );
  };

  // constants
  var PHOTON_EMITTER_WIDTH = 125;
  var CORNER_RADIUS = 7;

  /**
   * Constructor for a Molecules and Light observation window.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function ObservationWindow( photonAbsorptionModel, modelViewTransform, tandem ) {

    // Supertype constructor
    Rectangle.call( this, 0, 0, 500, 300, CORNER_RADIUS, CORNER_RADIUS, {
      fill: 'black',

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      accessibleLabel: 'Observation Window',
      prependLabels: true
    } );

    var self = this;
    this.modelViewTransform = modelViewTransform; // @private
    this.photonAbsorptionModel = photonAbsorptionModel; // @private

    // Width of the 'window frame' which surrounds the observation window.
    this.frameLineWidth = 5;

    // Property which keeps track of whether or not the 'Restore Molecule' button should be visible.
    this.returnMoleculeButtonVisibleProperty = new Property( false, {
      tandem: tandem.createTandem( 'returnMoleculeButtonVisibleProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } ); // @private

    // Add the layers for molecules, photons, and photon emitters.
    var moleculeLayer = new Node();
    this.addChild( moleculeLayer );

    var photonLayer = new Node();
    this.addChild( photonLayer );

    var photonEmitterLayer = new Node();
    this.addChild( photonEmitterLayer );

    // if using Edge, render the photon layer and emitter with SVG for improved performance, see #175
    if ( platform.edge ) {
      photonLayer.renderer = 'svg';
      photonEmitterLayer.renderer = 'svg';
    }

    // Create and add the photon emitter.
    var photonEmitterNode = new PhotonEmitterNode( PHOTON_EMITTER_WIDTH, photonAbsorptionModel, tandem.createTandem( 'photonEmitterNode' ) );
    photonEmitterNode.center = ( modelViewTransform.modelToViewPosition( photonAbsorptionModel.getPhotonEmissionLocation() ) );
    photonEmitterLayer.addChild( photonEmitterNode );

    // TODO: This clip area has been replaced with a layered rectangle in MoleculesAndLightScreenView because of a
    // Safari specific SVG bug caused by clipping.  Once we discover the cause of this bug, the clipping area can
    // replace the layered rectangle in MoleculesAndLightScreenView.  See
    // https://github.com/phetsims/molecules-and-light/issues/105 and https://github.com/phetsims/scenery/issues/412.
    // Add a clip area around the edge of the window frame to clean up photon and molecule removal from screen.
//    this.clipArea = new Shape().roundRect(
//      this.left,
//      this.top,
//      this.width,
//      this.height,
//      CORNER_RADIUS, CORNER_RADIUS ); // @private

    // Define bounds for where a particle should be removed from the scene.  Bounds are larger than those of the
    // clipping area so that particles have a chance to cleanly slide out of the window before being removed.
    this.particleRemovalBounds = this.bounds.copy().dilate( 20 ); // @private

    // Add the button for restoring molecules that break apart.
    var buttonContent = new Text( buttonNodeReturnMoleculeString, { font: new PhetFont( 13 ) } );
    // If necessary, scale the button content for translation purposes.  Max button width is half the width of the
    // observation window.
    var maxButtonWidth = this.width / 2;
    if ( buttonContent.width > maxButtonWidth ) {
      buttonContent.scale( maxButtonWidth / buttonContent.width );
    }
    // @private
    this.returnMoleculeButtonNode = new RectangularPushButton( {
      content: buttonContent,
      baseColor: 'rgb(247, 151, 34)',
      touchAreaXDilation: 7,
      touchAreaYDilation: 7,
      listener: function() {
        // a11y
        // move focus to the emission control slider only when the button is clicked
        // retain focus on other elements if button was clicked without focus
        self.returnMoleculeButtonNode.isFocused() && photonEmitterNode.emissionRateControlSliderNode.emissionRateControlSlider.focus();
        
        photonAbsorptionModel.restoreActiveMolecule();
        self.returnMoleculeButtonVisibleProperty.set( false );
        self.moleculeCheckBounds();
      },
      tandem: tandem.createTandem( 'returnMoleculeButton' ),

      // a11y
      tagName: 'input',
      inputType: 'button',
      accessibleDescription: returnMoleculeHelpString,
      ariaLabel: returnMoleculeString
    } );

    this.returnMoleculeButtonNode.rightTop = ( new Vector2( this.width - 2 * this.frameLineWidth - 10, 10 ) );

    this.addChild( this.returnMoleculeButtonNode );

    // function for adding a molecule to this window and hooking up a removal listener
    function addMoleculeToWindow( molecule ) {
      var moleculeNode = new MoleculeNode( molecule, self.modelViewTransform ); //Create the molecule node.
      moleculeLayer.addChild( moleculeNode );

      // Determine if it is time to remove molecule and update restore molecule button visibility.
      var centerOfGravityObserver = function() {
        self.moleculeCheckBounds();
      };
      molecule.centerOfGravityProperty.link( centerOfGravityObserver );

      photonAbsorptionModel.activeMolecules.addItemRemovedListener( function removalListener( removedMolecule ) {
        if ( removedMolecule === molecule ) {
          molecule.centerOfGravityProperty.unlink( centerOfGravityObserver );
          moleculeLayer.removeChild( moleculeNode );
          photonAbsorptionModel.activeMolecules.removeItemRemovedListener( removalListener );
        }
      } );
    }

    // Add the initial molecules.
    photonAbsorptionModel.activeMolecules.forEach( addMoleculeToWindow );

    // Set up an event listener for adding and removing molecules.
    photonAbsorptionModel.activeMolecules.addItemAddedListener( addMoleculeToWindow );

    // Set up the event listeners for adding and removing photons.
    photonAbsorptionModel.photons.addItemAddedListener( function( addedPhoton ) {
      var photonNode = new PhotonNode( addedPhoton, self.modelViewTransform );
      photonLayer.addChild( photonNode );

      // Watch photon positions and determine if photon should be removed from window.
      var photonPositionObserver = function() {
        self.photonCheckBounds();
      };
      addedPhoton.locationProperty.link( photonPositionObserver );

      photonAbsorptionModel.photons.addItemRemovedListener( function removalListener( removedPhoton ) {
        if ( removedPhoton === addedPhoton ) {
          addedPhoton.locationProperty.hasListener( photonPositionObserver ) && addedPhoton.locationProperty.unlink( photonPositionObserver );
          photonLayer.removeChild( photonNode );
          photonAbsorptionModel.photons.removeItemRemovedListener( removalListener );
        }
      } );
    } );

    // If a new molecule is chosen with the molecule control panel, remove the "Restore Molecule" button.
    this.photonAbsorptionModel.photonTargetProperty.link( function() {
      self.returnMoleculeButtonVisibleProperty.set( false );
    } );

    this.returnMoleculeButtonVisibleProperty.link( function() {
      // hide the return molecule button
      self.returnMoleculeButtonNode.visible = self.returnMoleculeButtonVisibleProperty.get();
    } );

    // a11y - when photon target, emission rate frequency, or photon type changes, update the accessible description
    // of the observation window
    Property.multilink( [ photonAbsorptionModel.photonTargetProperty, photonAbsorptionModel.emissionFrequencyProperty, photonAbsorptionModel.photonWavelengthProperty ], this.updateAccessibleDescription.bind( this ) );

  }

  moleculesAndLight.register( 'ObservationWindow', ObservationWindow );

  return inherit( Rectangle, ObservationWindow, {

    /**
     * Update the visibility of the button that restores molecules that have broken apart.  This button should be
     * visible only when one or more molecules are off the screen.
     * @private
     */
    moleculeCheckBounds: function() {

      var moleculesToRemove = [];
      for ( var molecule = 0; molecule < this.photonAbsorptionModel.activeMolecules.length; molecule++ ) {
        if ( !this.particleRemovalBounds.containsPoint( this.modelViewTransform.modelToViewPosition( this.photonAbsorptionModel.activeMolecules.get( molecule ).getCenterOfGravityPos() ) ) ) {
          moleculesToRemove.push( this.photonAbsorptionModel.activeMolecules.get( molecule ) );
          this.returnMoleculeButtonVisibleProperty.set( true );
          break;
        }
      }
      this.photonAbsorptionModel.activeMolecules.removeAll( moleculesToRemove );
    },

    /**
     * Check to see if any photons collide with the observation window.  If there is a collision, remove the photon
     * from the model.
     * @private
     */
    photonCheckBounds: function() {

      var photonsToRemove = [];
      for ( var photon = 0; photon < this.photonAbsorptionModel.photons.length; photon++ ) {
        if ( !this.particleRemovalBounds.containsPoint( this.modelViewTransform.modelToViewPosition( this.photonAbsorptionModel.photons.get( photon ).locationProperty.get() ) ) ) {
          photonsToRemove.push( this.photonAbsorptionModel.photons.get( photon ) );
        }
      }
      this.photonAbsorptionModel.photons.removeAll( photonsToRemove );

      // dispose all photons that leave the observation window
      for ( var i = 0; i < photonsToRemove.length; i++ ) {
        photonsToRemove[ i ].dispose();
      }
    },

//     "Case 1 (light source off):
// In observation window, {{ultraviolet}} light source is off and points directly at {{an}} {{ozone}} molecule. 

// Case 2 (light source on):
// In observation window, {{ultraviolet}} light source emits photons directly at {{an}} {{ozone}} molecule.
// "

    updateAccessibleDescription: function( photonTarget, emissionFrequency, wavelength ) {

      var lightSourceString = WavelengthConstants.getLightSourceName( wavelength );
      var moleculeString = getMoleculeName( photonTarget );
      var onOfString = emissionFrequency > 0 ? emitsPhotonsString : isOffAndPointsString;
      var aOrAn = 'AEIOU'.search( moleculeString.charAt( 1 ) ) === -1 ? aString : anString;

      this.accessibleDescription = StringUtils.fillIn( observationWindowDescriptionPatternString, {
        wavelengthName: lightSourceString,
        molecule: moleculeString,
        lightOnOffLanguage: onOfString,
        an: aOrAn
      } );
    }
  } );
} );

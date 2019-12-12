// Copyright 2014-2019, University of Colorado Boulder

/**
 * View for Molecules and Light
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco
 *
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const DialogIO = require( 'SUN/DialogIO' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LightSpectrumDialog = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/LightSpectrumDialog' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  const MoleculesAndLightA11yStrings = require( 'MOLECULES_AND_LIGHT/common/MoleculesAndLightA11yStrings' );
  const MoleculesAndLightScreenSummaryNode = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/MoleculesAndLightScreenSummaryNode' );
  const MoleculeSelectionPanel = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/MoleculeSelectionPanel' );
  const ObservationWindow = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/ObservationWindow' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PhetioCapsule = require( 'TANDEM/PhetioCapsule' );
  const PhetioCapsuleIO = require( 'TANDEM/PhetioCapsuleIO' );
  const PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  const QuadEmissionFrequencyControlPanel = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/QuadEmissionFrequencyControlPanel' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const soundManager = require( 'TAMBO/soundManager' );
  const SpectrumDiagram = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/SpectrumDiagram' );
  const StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants' );
  const WindowFrameNode = require( 'MOLECULES_AND_LIGHT/moleculesandlight/view/WindowFrameNode' );

  // strings
  const spectrumWindowButtonCaptionString = require( 'string!MOLECULES_AND_LIGHT/SpectrumWindow.buttonCaption' );

  // a11y strings
  const spectrumButtonLabelString = MoleculesAndLightA11yStrings.spectrumButtonLabelString.value;
  const spectrumButtonDescriptionString = MoleculesAndLightA11yStrings.spectrumButtonDescriptionString.value;
  const stepButtonLabelString = MoleculesAndLightA11yStrings.stepButtonLabelString.value;
  const stepButtonDescriptionString = MoleculesAndLightA11yStrings.stepButtonDescriptionString.value;

  // sounds
  const breakApartSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/break-apart.mp3' );
  const moleculeEnergizedSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/glow-loop-higher.mp3' );
  const rotationClockwiseSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/rotate-clockwise.mp3' );
  const rotationCounterclockwiseSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/rotate-counterclockwise.mp3' );
  const vibrationSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/vibration.mp3' );
  const microwavePhotonFromMoleculeSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-release-microwave.mp3' );
  const infraredPhotonFromMoleculeSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-release-ir.mp3' );
  const visiblePhotonFromMoleculeSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-release-visible.mp3' );
  const ultravioletPhotonFromMoleculeSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-release-uv.mp3' );
  const microwavePhotonInitialEmissionSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-emit-microwave.mp3' );
  const infraredPhotonInitialEmissionSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-emit-ir.mp3' );
  const visiblePhotonInitialEmissionSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-emit-visible.mp3' );
  const ultravioletPhotonInitialEmissionSoundInfo = require( 'sound!MOLECULES_AND_LIGHT/photon-emit-uv.mp3' );

  // constants
  // Model-view transform for intermediate coordinates.
  const INTERMEDIATE_RENDERING_SIZE = new Dimension2( 500, 300 );

  // Location of the top left corner of the observation window.
  const OBSERVATION_WINDOW_LOCATION = new Vector2( 15, 15 );

  // Corner radius of the observation window.
  const CORNER_RADIUS = 7;

  // Line width of the observation window frame
  const FRAME_LINE_WIDTH = 5;

  // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/molecules-and-light/issues/233
  // volume of photon emission sounds
  const PHOTON_SOUND_OUTPUT_LEVEL = 0.07;

  // X position at which the lamp emission sound is played, empirically determined
  const PLAY_LAMP_EMISSION_X_POSITION = -1400;

  /**
   * Constructor for the screen view of Molecules and Light.
   *
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {Tandem} tandem
   * @constructor
   */
  function MoleculesAndLightScreenView( photonAbsorptionModel, tandem ) {

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      tandem: tandem,
      screenSummaryContent: new MoleculesAndLightScreenSummaryNode( photonAbsorptionModel )
    } );

    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( Util.roundSymmetric( INTERMEDIATE_RENDERING_SIZE.width * 0.55 ),
        Util.roundSymmetric( INTERMEDIATE_RENDERING_SIZE.height * 0.50 ) ),
      0.10 ); // Scale factor - Smaller number zooms out, bigger number zooms in.

    // @private - Create the observation window.  This will hold all photons, molecules, and photonEmitters for this photon
    // absorption model.
    this.observationWindow = new ObservationWindow(
      photonAbsorptionModel,
      modelViewTransform,
      tandem.createTandem( 'observationWindow' )
    );
    this.pdomPlayAreaNode.addChild( this.observationWindow );

    // This rectangle hides photons that are outside the observation window.
    // TODO: This rectangle is a temporary workaround that replaces the clipping area in ObservationWindow because of a
    // Safari specific SVG bug caused by clipping.  See https://github.com/phetsims/molecules-and-light/issues/105 and
    // https://github.com/phetsims/scenery/issues/412.
    const clipRectangle = new Rectangle( this.observationWindow.bounds.copy().dilate( 4 * FRAME_LINE_WIDTH ),
      CORNER_RADIUS, CORNER_RADIUS, {
        stroke: '#C5D6E8',
        lineWidth: 8 * FRAME_LINE_WIDTH,
        pickable: false
      } );
    this.pdomPlayAreaNode.addChild( clipRectangle );

    // Create the window frame node that borders the observation window.
    const windowFrameNode = new WindowFrameNode( this.observationWindow, '#BED0E7', '#4070CE' );
    this.pdomPlayAreaNode.addChild( windowFrameNode );

    // Set positions of the observation window and window frame.
    this.observationWindow.translate( OBSERVATION_WINDOW_LOCATION );
    clipRectangle.translate( OBSERVATION_WINDOW_LOCATION );
    windowFrameNode.translate( OBSERVATION_WINDOW_LOCATION );

    // Create the control panel for photon emission frequency.
    const photonEmissionControlPanel = new QuadEmissionFrequencyControlPanel(
      photonAbsorptionModel,
      tandem.createTandem( 'photonEmissionControlPanel' )
    );
    photonEmissionControlPanel.leftTop = ( new Vector2( OBSERVATION_WINDOW_LOCATION.x, 350 ) );

    // Create the molecule control panel
    const moleculeControlPanel = new MoleculeSelectionPanel(
      photonAbsorptionModel,
      tandem.createTandem( 'moleculeControlPanel' )
    );
    moleculeControlPanel.leftTop = ( new Vector2( 530, windowFrameNode.top ) );

    // Add reset all button.
    const resetAllButton = new ResetAllButton( {
      listener: function() { photonAbsorptionModel.reset(); },
      bottom: this.layoutBounds.bottom - 15,
      right: this.layoutBounds.right - 15,
      radius: 18,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.pdomControlAreaNode.addChild( resetAllButton );

    // Add play/pause button.
    const playPauseButton = new PlayPauseButton( photonAbsorptionModel.runningProperty, {
      bottom: moleculeControlPanel.bottom + 60,
      centerX: moleculeControlPanel.centerX - 25,
      radius: 23,
      touchAreaDilation: 5,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );
    this.pdomControlAreaNode.addChild( playPauseButton );

    // Add step button to manually step the animation.
    const stepButton = new StepForwardButton( {
      isPlayingProperty: photonAbsorptionModel.runningProperty,
      listener: function() { photonAbsorptionModel.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: moleculeControlPanel.centerX + 25,
      radius: 15,
      touchAreaDilation: 5,
      tandem: tandem.createTandem( 'stepButton' ),

      // a11y
      innerContent: stepButtonLabelString,
      descriptionContent: stepButtonDescriptionString,
      appendDescription: true
    } );
    this.pdomControlAreaNode.addChild( stepButton );

    // Content for the window that displays the EM spectrum upon request.  Constructed once here so that time is not
    // waisted drawing a new spectrum window every time the user presses the 'Show Light Spectrum' button.
    // @private
    const spectrumButtonLabel = new SpectrumDiagram( tandem.createTandem( 'spectrumButtonLabel' ) );

    const lightSpectrumDialogCapsule = new PhetioCapsule( 'lightSpectrumDialog', tandem => {
      return new LightSpectrumDialog( spectrumButtonLabel, tandem );
    }, [], {
      tandem: tandem.createTandem( 'lightSpectrumDialogCapsule' ),
      phetioType: PhetioCapsuleIO( DialogIO )
    } );

    // Add the button for displaying the electromagnetic spectrum. Scale down the button content when it gets too
    // large.  This is done to support translations.  Max width of this button is the width of the molecule control
    // panel minus twice the default x margin of a rectangular push button.
    const buttonContent = new Text( spectrumWindowButtonCaptionString, { font: new PhetFont( 18 ) } );
    if ( buttonContent.width > moleculeControlPanel.width - 16 ) {
      buttonContent.scale( ( moleculeControlPanel.width - 16 ) / buttonContent.width );
    }
    var showLightSpectrumButton = new RectangularPushButton( {
      content: buttonContent,
      baseColor: 'rgb(98, 173, 205)',
      touchAreaXDilation: 7,
      touchAreaYDilation: 7,
      listener: function() {
        const dialog = lightSpectrumDialogCapsule.getInstance();
        dialog.show();

        // if listener was fired because of accessibility
        if ( showLightSpectrumButton.buttonModel.isA11yClicking() ) {
          dialog.focusCloseButton();
        }
      },
      tandem: tandem.createTandem( 'showLightSpectrumButton' ),

      // a11y
      innerContent: spectrumButtonLabelString,
      descriptionContent: spectrumButtonDescriptionString,
      appendDescription: true,
      containerTagName: 'div'
    } );

    // a11y - add an attribute that lets the user know the button opens a menu
    showLightSpectrumButton.setAccessibleAttribute( 'aria-haspopup', true );

    showLightSpectrumButton.center = ( new Vector2( moleculeControlPanel.centerX, photonEmissionControlPanel.centerY - 13 ) );
    this.pdomPlayAreaNode.addChild( showLightSpectrumButton );

    // Add the nodes in the order necessary for correct layering.
    this.pdomPlayAreaNode.addChild( photonEmissionControlPanel );
    this.pdomPlayAreaNode.addChild( moleculeControlPanel );

    // PDOM - the accessible order for the control area contents
    this.pdomPlayAreaNode.accessibleOrder = [ this.observationWindow, clipRectangle, windowFrameNode, photonEmissionControlPanel, moleculeControlPanel ];
    this.pdomControlAreaNode.accessibleOrder = [ playPauseButton, stepButton, showLightSpectrumButton, resetAllButton ];

    //-----------------------------------------------------------------------------------------------------------------
    // sound generation
    //-----------------------------------------------------------------------------------------------------------------

    // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/molecules-and-light/issues/233
    // sound to play when molecule becomes "energized", which is depicted as glowing in the view
    const moleculeEnergizedLoop = new SoundClip( moleculeEnergizedSoundInfo, {
      loop: true,
      initialOutputLevel: 0.1,
      enableControlProperties: [ photonAbsorptionModel.runningProperty ]
    } );
    soundManager.addSoundGenerator( moleculeEnergizedLoop );
    const updateMoleculeEnergizedSound = moleculeEnergized => {
      if ( moleculeEnergized ) {
        moleculeEnergizedLoop.play();
      }
      else {
        moleculeEnergizedLoop.stop();
      }
    };

    // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/molecules-and-light/issues/233
    // break apart sound
    const breakApartSound2 = new SoundClip( breakApartSoundInfo, { initialOutputLevel: 1 } );
    soundManager.addSoundGenerator( breakApartSound2 );
    const breakApartSoundPlayer = () => {
      breakApartSound2.play();
    };

    // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/molecules-and-light/issues/233
    // molecule rotating sounds
    const rotateClockwiseSoundPlayer = new SoundClip( rotationClockwiseSoundInfo, {
      initialOutputLevel: 0.5,
      loop: true
    } );
    soundManager.addSoundGenerator( rotateClockwiseSoundPlayer );
    const rotateCounterclockwiseSoundPlayer = new SoundClip( rotationCounterclockwiseSoundInfo, {
      initialOutputLevel: 0.5,
      loop: true
    } );
    soundManager.addSoundGenerator( rotateCounterclockwiseSoundPlayer );

    const updateRotationSound = rotating => {
      if ( rotating ) {

        // this is only set up for a single molecule
        assert && assert( photonAbsorptionModel.activeMolecules.length === 1 );

        // play a sound based on the direction of rotation and the currently selected sound from the options dialog
        const molecule = photonAbsorptionModel.activeMolecules.get( 0 );
        if ( molecule.rotationDirectionClockwiseProperty.value ) {
          rotateClockwiseSoundPlayer.play();
        }
        else {
          rotateCounterclockwiseSoundPlayer.play();
        }
      }
      else {
        rotateClockwiseSoundPlayer.stop();
        rotateCounterclockwiseSoundPlayer.stop();
      }
    };

    // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/molecules-and-light/issues/233
    // molecule vibration sound
    const moleculeVibrationLoop = new SoundClip( vibrationSoundInfo, {
      initialOutputLevel: 0.2,
      loop: true,
      enableControlProperties: [ photonAbsorptionModel.runningProperty ]
    } );
    soundManager.addSoundGenerator( moleculeVibrationLoop );
    const updateVibrationSound = vibrating => {
      if ( vibrating ) {

        // start the vibration sound playing (this will have no effect if the sound is already playing)
        moleculeVibrationLoop.play();
      }
      else {
        moleculeVibrationLoop.stop();
      }
    };

    // function that adds all of the listeners involved in creating sound
    const addSoundPlayersToMolecule = molecule => {
      molecule.highElectronicEnergyStateProperty.link( updateMoleculeEnergizedSound );
      molecule.brokeApartEmitter.addListener( breakApartSoundPlayer );
      molecule.rotatingProperty.link( updateRotationSound );
      molecule.vibratingProperty.link( updateVibrationSound );
    };

    // add listeners to molecules for playing the sounds
    photonAbsorptionModel.activeMolecules.forEach( addSoundPlayersToMolecule );
    photonAbsorptionModel.activeMolecules.addItemAddedListener( addSoundPlayersToMolecule );

    // remove listeners when the molecules go away
    photonAbsorptionModel.activeMolecules.addItemRemovedListener( function( removedMolecule ) {
      if ( removedMolecule.highElectronicEnergyStateProperty.hasListener( updateMoleculeEnergizedSound ) ) {
        removedMolecule.highElectronicEnergyStateProperty.unlink( updateMoleculeEnergizedSound );
      }
      if ( removedMolecule.brokeApartEmitter.hasListener( breakApartSoundPlayer ) ) {
        removedMolecule.brokeApartEmitter.removeListener( breakApartSoundPlayer );
      }
      if ( removedMolecule.rotatingProperty.hasListener( updateRotationSound ) ) {
        removedMolecule.rotatingProperty.unlink( updateRotationSound );
      }
      if ( removedMolecule.vibratingProperty.hasListener( updateVibrationSound ) ) {
        removedMolecule.vibratingProperty.unlink( updateVibrationSound );
      }
    } );

    // photon generation sounds (i.e. the photons coming from the lamps)
    const photonSoundClipOptions = { initialOutputLevel: PHOTON_SOUND_OUTPUT_LEVEL };

    // Note - can't use initialization constructor for Map due to lack of support in IE.
    const photonInitialEmissionSoundPlayers = new Map();
    photonInitialEmissionSoundPlayers.set(
      WavelengthConstants.MICRO_WAVELENGTH,
      new SoundClip( microwavePhotonInitialEmissionSoundInfo, photonSoundClipOptions )
    );
    photonInitialEmissionSoundPlayers.set(
      WavelengthConstants.IR_WAVELENGTH,
      new SoundClip( infraredPhotonInitialEmissionSoundInfo, photonSoundClipOptions )
    );
    photonInitialEmissionSoundPlayers.set(
      WavelengthConstants.VISIBLE_WAVELENGTH,
      new SoundClip( visiblePhotonInitialEmissionSoundInfo, photonSoundClipOptions )
    );
    photonInitialEmissionSoundPlayers.set(
      WavelengthConstants.UV_WAVELENGTH,
      new SoundClip( ultravioletPhotonInitialEmissionSoundInfo, photonSoundClipOptions )
    );
    photonInitialEmissionSoundPlayers.forEach( value => {
      soundManager.addSoundGenerator( value );
    } );

    // Note - can't use initialization constructor for Map due to lack of support in IE.
    const photonEmissionFromMoleculeSoundPlayers = new Map();
    photonEmissionFromMoleculeSoundPlayers.set(
      WavelengthConstants.MICRO_WAVELENGTH,
      new SoundClip( microwavePhotonFromMoleculeSoundInfo, photonSoundClipOptions )
    );
    photonEmissionFromMoleculeSoundPlayers.set(
      WavelengthConstants.IR_WAVELENGTH,
      new SoundClip( infraredPhotonFromMoleculeSoundInfo, photonSoundClipOptions )
    );
    photonEmissionFromMoleculeSoundPlayers.set(
      WavelengthConstants.VISIBLE_WAVELENGTH,
      new SoundClip( visiblePhotonFromMoleculeSoundInfo, photonSoundClipOptions )
    );
    photonEmissionFromMoleculeSoundPlayers.set(
      WavelengthConstants.UV_WAVELENGTH,
      new SoundClip( ultravioletPhotonFromMoleculeSoundInfo, photonSoundClipOptions )
    );
    photonEmissionFromMoleculeSoundPlayers.forEach( value => {
      soundManager.addSoundGenerator( value );
    } );

    photonAbsorptionModel.photons.addItemAddedListener( photon => {
      if ( photon.locationProperty.value.x < 0 ) {

        // photon was emitted from lamp, use the initial emission sound
        const playEmitFromLampSound = position => {
          if ( position.x >= PLAY_LAMP_EMISSION_X_POSITION ) {
            photonInitialEmissionSoundPlayers.get( photon.wavelength ).play();
            photon.locationProperty.unlink( playEmitFromLampSound );
          }
        };
        photon.locationProperty.link( playEmitFromLampSound );
      }
      else {

        // photon was emitted from lamp, use the secondary emission sound (finalized as of 12/2/2019)
        photonEmissionFromMoleculeSoundPlayers.get( photon.wavelength ).play();
      }
    } );
  }

  moleculesAndLight.register( 'MoleculesAndLightScreenView', MoleculesAndLightScreenView );

  return inherit( ScreenView, MoleculesAndLightScreenView,  {

    /**
     * View step, called by joist.
     * @public
     *
     * @param {number} dt
     * @returns {}
     */
    step( dt ) {
      this.observationWindow.step( dt );
    }
  } );
} );

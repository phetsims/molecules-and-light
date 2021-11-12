// Copyright 2021, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import moleculesAndLight from './moleculesAndLight.js';

type StringsType = {
  'molecules-and-light': {
    'title': string
  },
  'QuadWavelengthSelector': {
    'Microwave': string,
    'Infrared': string,
    'Visible': string,
    'Ultraviolet': string,
    'HigherEnergy': string
  },
  'molecularNamePattern': string,
  'ControlPanel': {
    'CarbonMonoxide': string,
    'Nitrogen': string,
    'Oxygen': string,
    'CarbonDioxide': string,
    'Methane': string,
    'NitrogenDioxide': string,
    'Ozone': string,
    'Water': string
  },
  'ButtonNode': {
    'ReturnMolecule': string
  },
  'SpectrumWindow': {
    'buttonCaption': string,
    'title': string,
    'frequencyArrowLabel': string,
    'wavelengthArrowLabel': string,
    'radioBandLabel': string,
    'microwaveBandLabel': string,
    'infraredBandLabel': string,
    'ultravioletBandLabel': string,
    'xrayBandLabel': string,
    'gammaRayBandLabel': string,
    'visibleBandLabel': string,
    'cyclesPerSecondUnits': string,
    'metersUnits': string
  },
  'keyboardHelpDialog': {
    'observationWindow': string,
    'turnLightSourceOnOrOff': string,
    'pauseOrPlayShortcut': string,
    'stepForwardShortcut': string
  },
  'openSciEd': {
    'energySource': string
  },
  'a11y': {
    'playAreaSummary': string,
    'controlAreaSummary': string,
    'dynamicPlayingScreenSummaryPattern': string,
    'dynamicPausedScreenSummaryPattern': string,
    'simIsPaused': string,
    'simIsPausedOnSlowSpeed': string,
    'screenSummaryWithHintPattern': string,
    'interactionHint': string,
    'lightSource': {
      'buttonLabelPattern': string,
      'buttonPressedHelpText': string,
      'buttonUnpressedHelpText': string
    },
    'lightSources': string,
    'isOffAndPoints': string,
    'emitsPhotons': string,
    'emitsPhotonsOnSlowSpeed': string,
    'observationWindowLabel': string,
    'photonEmitterOffDescriptionPattern': string,
    'inactiveAndPassesPhaseDescriptionPattern': string,
    'targetMoleculePattern': string,
    'absorptionPhaseBondsDescriptionPattern': string,
    'absorptionPhaseMoleculeDescriptionPattern': string,
    'breakApartPhaseDescriptionPattern': string,
    'emissionPhaseDescriptionPattern': string,
    'bendUpAndDown': string,
    'stretchBackAndForth': string,
    'rotatesClockwise': string,
    'rotatesCounterClockwise': string,
    'glowsString': string,
    'breaksApart': string,
    'emptySpace': string,
    'lightSourceRadioButtonHelpText': string,
    'molecules': string,
    'moleculesRadioButtonHelpText': string,
    'moleculeButtonLabelPattern': string,
    'spectrumButtonLabel': string,
    'spectrumButtonDescription': string,
    'spectrumWindowDescription': string,
    'spectrumWindowEnergyDescription': string,
    'spectrumWindowSinWaveDescription': string,
    'spectrumWindowLabelledSpectrumLabel': string,
    'spectrumWindowLabelledSpectrumDescription': string,
    'spectrumWindowLabelledSpectrumRadioLabel': string,
    'spectrumWindowLabelledSpectrumMicrowaveLabel': string,
    'spectrumWindowLabelledSpectrumInfraredLabel': string,
    'spectrumWindowLabelledSpectrumVisibleLabel': string,
    'spectrumWindowLabelledSpectrumUltravioletLabel': string,
    'spectrumWindowLabelledSpectrumXRayLabel': string,
    'spectrumWindowLabelledSpectrumGammaRayLabel': string,
    'spectrumWindowLabelledSpectrumRadioFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumRadioWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumMicrowaveFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumMicrowaveWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumInfraredFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumInfraredWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumVisibleFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumVisibleWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumVisibleGraphicalDescription': string,
    'spectrumWindowLabelledSpectrumUltravioletFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumUltravioletWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumXRayFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumXRayWavelengthDescription': string,
    'spectrumWindowLabelledSpectrumGammaRayFrequencyDescription': string,
    'spectrumWindowLabelledSpectrumGammaRayWavelengthDescription': string,
    'carbonMonoxide': string,
    'nitrogen': string,
    'oxygen': string,
    'diatomicOxygen': string,
    'carbonDioxide': string,
    'nitrogenDioxide': string,
    'water': string,
    'ozone': string,
    'methane': string,
    'linear': string,
    'bent': string,
    'tetrahedral': string,
    'diatomic': string,
    'geometryLabelPattern': string,
    'linearGeometryDescription': string,
    'bentGeometryDescription': string,
    'tetrahedralGeometryDescription': string,
    'shortStretchingAlert': string,
    'longStretchingAlert': string,
    'shortBendingAlert': string,
    'longBendingAlert': string,
    'shortRotatingAlert': string,
    'longRotatingAlert': string,
    'shortGlowingAlert': string,
    'longGlowingAlert': string,
    'breaksApartAlertPattern': string,
    'pausedEmittingPattern': string,
    'pausedPassingPattern': string,
    'slowMotionPassingPattern': string,
    'photonPasses': string,
    'photonsPassing': string,
    'slowMotionVibratingPattern': string,
    'slowMotionAbsorbedMoleculeExcitedPattern': string,
    'slowMotionAbsorbedShortPattern': string,
    'slowMotionBreakApartPattern': string,
    'moleculesFloatingAwayPattern': string,
    'breakApartDescriptionWithFloatPattern': string,
    'moleculePiecesGone': string,
    'slowMotionEmittedPattern': string,
    'resetOrChangeMolecule': string,
    'photonEmitter': {
      'alerts': {
        'photonsOff': string,
        'photonsOn': string,
        'photonsOnSlowSpeed': string,
        'photonsOnSimPaused': string,
        'photonsOnSlowSpeedSimPaused': string,
        'pausedPhotonEmittedPattern': string
      }
    },
    'timeControls': {
      'simPausedEmitterOnAlert': string,
      'simPausedEmitterOffAlert': string,
      'simPlayingHintAlert': string,
      'stepHintAlert': string
    },
    'keyboardHelpDialog': {
      'turnLightSourceOnOrOffDescription': string,
      'pauseOrPlayShortcutDescription': string,
      'stepForwardShortcutDescription': string
    }
  }
};

const moleculesAndLightStrings = getStringModule( 'MOLECULES_AND_LIGHT' ) as StringsType;

moleculesAndLight.register( 'moleculesAndLightStrings', moleculesAndLightStrings );

export default moleculesAndLightStrings;

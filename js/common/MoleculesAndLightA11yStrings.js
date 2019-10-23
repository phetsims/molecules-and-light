// Copyright 2017-2019, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  const moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );

  const MoleculesAndLightA11yStrings = {

    screenSummaryString: {
      value: 'In the Play Area, you find an observation window that contains a light source and a molecule. You can adjust the rate of photons being emitted at molecule, choose a different molecule, or change light source. From the Control Area you can use buttons to pause/play and step forward what’s happening in the observation window. You can also access details about the light spectrum and reset the sim.'
    },
    observationWindowDescriptionPatternString: {
      value: 'In observation window, {{wavelengthName}} light source {{lightOnOffLanguage}} directly at {{an}} {{molecule}} molecule.'
    },
    dynamicScreenSummaryString: {
      value: 'Currently, {{playingState}}, {{lightSource}} light source {{emissionRate}} directly at {{photonTarget}} molecule.'
    },
    interactionHintString: {
      value: 'Look for light source slider to play.'
    },
    lightSourceSliderString: {
      value: 'Light Source Slider'
    },
    isOffAndPointsString: {
      value: 'is off and points'
    },
    emitsPhotonsSlowlyString: {
      value: 'emits photons slowly and'
    },
    emitsPhotonsVerySlowlyString: {
      value: 'emits photons very slowly and'
    },
    emitsPhotonsQuicklyString: {
      value: 'emits photons quickly and'
    },
    emitsPhotonsString: {
      value: 'emits photons'
    },
    emitterInObservationWindowString: {
      value: 'in observation window'
    },
    emitterPausedInObservationWindowString: {
      value: 'paused in observation window'
    },
    aString: {
      value: 'a'
    },
    anString: {
      value: 'an'
    },
    emissionSliderDescriptionString: {
      value: 'Adjust rate at which photons are released.'
    },
    emissionSliderWavelengthRatePatterString: {
      value: '{{wavelength}} photon rate, {{frequency}}'
    },
    lightSourceString: {
      value: 'Light Source'
    },
    lightSourceDescriptionString: {
      value: 'Change light source in observation window.'
    },
    moleculesString: {
      value: 'Molecules'
    },
    moleculesPanelDescriptionString: {
      value: 'Place molecule in front of light source.'
    },
    pauseDescriptionString: {
      value: 'Pause what is happening in the observation window.'
    },
    playDescriptionString: {
      value: 'Resume what is happening in the observation window'
    },
    stepButtonLabelString: {
      value: 'Next Frame'
    },
    stepButtonDescriptionString: {
      value: 'Make careful observations, one frame at a time.'
    },
    spectrumButtonLabelString: {
      value: 'Show light spectrum'
    },
    spectrumButtonDescriptionString: {
      value: 'Details about how frequncy, energy, and wavelength change across teh light spectrum.'
    },
    spectrumWindowDescriptionString: {
      value: 'The show light spectrum button opens a window displaying the EM spectrum with the values of the frequency and wavelength shown. Additional arrows show the direction of increasing frequency/energy and wavelength. A sketch of a wave with decreasing wavelength/increasing frequency is also provided.'
    },
    returnMoleculeString: {
      value: 'Return Molecule'
    },
    returnMoleculeHelpString: {
      value: 'Returns a molecule.'
    },
    moleculeSelectionAlertPatternString: {
      value: '{{target}} molecule now in observation window.'
    },
    wavelengthSelectionAlertPatternString: {
      value: '{{wavelength}} light source now in observation window.'
    }
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( const key in MoleculesAndLightA11yStrings ) {
      MoleculesAndLightA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( MoleculesAndLightA11yStrings ); }

  moleculesAndLight.register( 'MoleculesAndLightA11yStrings', MoleculesAndLightA11yStrings );

  return MoleculesAndLightA11yStrings;
} );
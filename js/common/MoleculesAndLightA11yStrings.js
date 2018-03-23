// Copyright 2017, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );

  var MoleculesAndLightA11yStrings = {

    sceneSummaryString: {
      value: 'This is an interactive sim. Descriptions change as you play with it. It has a Play Area and Control Panel.' +
             'The Play Area contains an observation window, a list of molecules, and a list of light sources. Within the observation window, there is a light source pointing directly to a molecule.' +
             'You can select different light sources and molecules, and explore how photons with different frequency and energy interact with the molecules.' +
             'The Control Panel has buttons to change the view, open a light spectrum graphic for reference, and reset the sim.'
    },
    summaryInteractionHintString: {
      value: 'Look for photon rate slider to play.'
    },
    keyboardShortcutsHintString: {
      value: 'If needed, check out the Keyboard Shortcuts for this sim.'
    },
    observationWindowDescriptionPatternString: {
      value: 'In observation window, {{wavelengthName}} light source {{lightOnOffLanguage}} directly at {{an}} {{molecule}} molecule.'
    },
    lightSourceSliderString: {
      value: 'Light Source Slider'
    },
    isOffAndPointsString: {
      value: 'is off and points'
    },
    emitsPhotonsString: {
      value: 'emits photons'
    },
    aString: {
      value: 'a'
    },
    anString: {
      value: 'an'
    },
    emissionSliderDescriptionString: {
      value: 'Adjust rate at which photons are released.',
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
    nitrogenDescriptionString: {
      value: 'A Nitrogen molecule consists of two Nitrogen atoms by a triple bond'
    }, 
    oxygenDescriptionString: {
      value: 'An Oxygen molecule has two Oxygen atoms connected by a covalent double bond'
    },
    carbonMonoxideDescriptionString: {
      value: 'A Carbon monoxide molecule consists of one carbon atom and one oxygen atom, connected by a triple bond that consists of two covalent bonds as well as one dative covalent bond.'
    },
    carbonDioxideDescriptionString: {
      value: 'A Carbon dioxide molecule consists of a carbonatom covalently double bonded to two oxygen atoms.'
    },
    waterDescriptionString: {
      value: 'Water has two hydrogen atoms covalently bonded to a single oxygenatom.'
    },
    nitrogenDioxideDescriptionString: {
      value: 'A Nitrogen dioxide molecule consists of a nitrogen atom covalently double bonded to an oxygen atom and single bonded to another oxygen atom.'
    },
    ozoneDescriptionString: {
      value: 'A Ozone moledule consists of an Oxygen atom covalently double bonded to an Oxygen atom and single bonded to another Oxygen atom.'
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
    // lightSourceTitlePattern: {
    //   value: '{{lightSourceName}} {{lightSourceString}}'
    // },
    returnMoleculeString: {
      value: 'Return Molecule'
    },
    returnMoleculeHelpString: {
      value: 'Returns a molecule.'
    },
    closeString: {
      value: 'Close'
    }
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in MoleculesAndLightA11yStrings ) {
      MoleculesAndLightA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( MoleculesAndLightA11yStrings ); }

  moleculesAndLight.register( 'MoleculesAndLightA11yStrings', MoleculesAndLightA11yStrings );

  return MoleculesAndLightA11yStrings;
} );
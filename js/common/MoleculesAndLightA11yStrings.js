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
    },
    spectrumDiagramString: {
      value: 'Spectrum Diagram'
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
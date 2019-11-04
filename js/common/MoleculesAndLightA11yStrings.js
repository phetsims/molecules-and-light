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
    dynamicScreenSummaryString: {
      value: 'Currently, {{playingState}}, {{lightSource}} light source {{emissionRate}} directly at {{target}}.'
    },
    interactionHintString: {
      value: 'Look for light source slider to play.'
    },
    lightSourceString: {
      value: 'Light Source'
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
    observationWindowLabelString: {
      value: 'Observation Window'
    },
    photonEmitterDescriptionPatternString: {
      value: '{{lightSource}} light source {{emissionRate}} directly at {{target}}.'
    },
    inactiveAndPassingPhaseDescriptionPatternString: {
      value: '{{lightSource}} photons passing through {{target}}.'
    },
    targetMoleculePatternString: {
      value: '{{photonTarget}} molecule'
    },
    absorptionPhaseDescriptionPatternString: {
      value: '{{lightSource}} photon absorbed and bonds of {{photonTarget}} molecule {{excitedRepresentation}}.'
    },
    breakApartPhaseDescriptionPatternString: {
      value: '{{lightSource}} photon absorbed and {{photonTarget}} molecule breaks part into {{firstMolecule}} and {{secondMolecule}}.'
    },
    emissionPhaseDescriptionPatternString: {
      value: '{{photonTarget}} molecule stops {{excitedRepresentation}} and emits absorbed {{lightSource}} photon {{direction}}.'
    },
    moleculesOutOfViewPatternString: {
      value: '{{firstMolecule}} and {{secondMolecule}} out of view. Return molecule to make more observations.'
    },
    absorbedString: {
      value: 'absorbed'
    },
    stretchingString: {
      value: 'stretching'
    },
    contractingString: {
      value: 'contracting'
    },
    bendingString: {
      value: 'bending'
    },
    bendsUpAndDownString: {
      value: 'bends up and down'
    },
    rotatingClockwiseString: {
      value: 'rotating clockwise'
    },
    rotatingCounterClockwiseString: {
      value: 'rotating counter clockwise'
    },
    startsRotatingPatternString: {
      value: 'starts {{rotation}}'
    },
    stopsString: {
      value: 'stops {{rotation}}'
    },
    startsGlowingString: {
      value: 'starts glowing'
    },
    glowingString: {
      value: 'glowing'
    },
    breaksApartString: {
      value: 'breaks apart'
    },
    emptySpaceString: {
      value: 'empty space'
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
      value: 'Adjust to emit photons at different rates.'
    },
    emissionSliderWavelengthRatePatterString: {
      value: '{{wavelength}} photon rate, {{frequency}}'
    },
    lightSourceRadioButtonHelpTextString: {
      value: 'Choose light source, ordered low to high energy, and observe effects on molecule.'
    },
    moleculesString: {
      value: 'Molecules'
    },
    moleculesRadioButtonHelpTextString: {
      value: 'Choose molecule and observe interactions with light source.'
    },
    moleculeButtonLabelPatternString: {
      value: '{{molecularName}}, {{molecularFormula}}, {{geometryTitle}}'
    },
    stepButtonLabelString: {
      value: 'Next Frame'
    },
    stepButtonDescriptionString: {
      value: 'Pause, play, or step forward in time while paused.'
    },
    spectrumButtonLabelString: {
      value: 'Show Light Spectrum'
    },
    spectrumButtonDescriptionString: {
      value: 'See details of full light spectrum.'
    },
    spectrumWindowDescriptionString: {
      value: 'The show light spectrum button opens a window displaying the EM spectrum with the values of the frequency and wavelength shown. Additional arrows show the direction of increasing frequency/energy and wavelength. A sketch of a wave with decreasing wavelength/increasing frequency is also provided.'
    },
    returnMoleculeString: {
      value: 'Return Molecule'
    },
    moleculeSelectionAlertPatternString: {
      value: '{{target}} molecule now in observation window.'
    },
    wavelengthSelectionAlertPatternString: {
      value: '{{wavelength}} light source now in observation window.'
    },
    carbonMonoxideString: {
      value: 'Carbon Monoxide'
    },
    nitrogenString: {
      value: 'Nitrogen'
    },
    oxygenString: {
      value: 'Oxygen'
    },
    diatomicOxygenString: {
      value: 'Diatomic Oxygen'
    },
    carbonDioxideString: {
      value: 'Carbon Dioxide'
    },
    nitrogenDioxideString: {
      value: 'Nitrogen Dioxide'
    },
    waterString: {
      value: 'Water'
    },
    ozoneString: {
      value: 'Ozone'
    },
    methaneString: {
      value: 'Methane'
    },
    linearString: {
      value: 'linear'
    },
    bentString: {
      value: 'bent'
    },
    tetrahedralString: {
      value: 'tetrahderal'
    },
    diatomicString: {
      value: 'diatomic'
    },
    linearTitleString: {
      value: 'Linear'
    },
    bentTitleString: {
      value: 'Bent'
    },
    tetrahedralTitleString: {
      value: 'Tetrahderal'
    },
    diatomicTitleString: {
      value: 'Diatomic'
    },
    geometryLabelPatternString: {
      value: 'This molecule has {{geometry}} geometry.'
    },
    linearGeometryDescriptionString: {
      value: 'Linear, molecule with a central atom bonded to one or two other atoms forming a straight line. Bond angle is 180 degrees.'
    },
    bentGeometryDescriptionString: {
      value: 'Bent, molecule with a central atom bonded to two other atoms that form an angle. Bond angle varies below 120 degrees.'
    },
    tetrahedralGeometryDescriptionString: {
      value: 'Tetrahedral, molecule with a central atom bonded to four other atoms forming a tetrahedron with 109.5° angles between them, like four-sided dice.'
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
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
    playAreaSummaryString: {
      value: 'In the Play Area, you find an observation window that contains a light source and a molecule. You can adjust the rate of photons being emitted at the molecule, choose a different molecule, or change light source.'
    },
    controlAreaSummaryString: {
      value: 'From the Control Area you can use buttons to pause/play and step forward what’s happening in the observation window. You can also access details about the light spectrum and reset the sim.'
    },
    dynamicScreenSummaryString: {
      value: 'Currently, {{playingState}}, {{lightSource}} light source {{emissionRate}} directly at {{target}}.'
    },
    interactionHintString: {
      value: 'Look for photon rate slider to play.'
    },
    lightSourceLabelPatternString: {
      value: '{{lightSource}} Photon Rate'
    },
    lightSourcesString: {
      value: 'Light Sources'
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
    absorptionPhaseBondsDescriptionPatternString: {
      value: '{{lightSource}} photon absorbed and bonds of {{photonTarget}} molecule {{excitedRepresentation}}.'
    },
    absorptionPhaseMoleculeDescriptionPatternString: {
      value: '{{lightSource}} photon absorbed and {{photonTarget}} molecule {{excitedRepresentation}}.'
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
    rotatingString: {
      value: 'rotating'
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
      value: 'Choose light source for observation window ordered low to high energy.'
    },
    moleculesString: {
      value: 'Molecules'
    },
    moleculesRadioButtonHelpTextString: {
      value: 'Choose molecule for observation window.'
    },
    moleculeButtonLabelPatternString: {
      value: '{{molecularName}}, {{molecularFormula}}, {{geometryTitle}}'
    },
    spectrumButtonLabelString: {
      value: 'Show Light Spectrum'
    },
    spectrumButtonDescriptionString: {
      value: 'See details of full light spectrum.'
    },
    spectrumDialogDescriptionString: {
      value: 'The Light Spectrum shows the relative energy of the different classifications of light waves as defined by their characteristic wavelengths (measured in meters) and frequencies (measured in Hertz or inverse seconds). The order from lowest energy (lowest frequency and largest wavelength) to highest energy (highest frequency and smallest wavelength) is Radio, Microwave, Infrared, Visible, Ultraviolet, X-ray, and Gamma ray. A sine wave [waveform] decreasing in wavelength (as measured by the distance from peak to peak) and increasing frequency (as measured by the number of waves per time interval) from Radio to Gamma Ray.'
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
      value: 'Linear, a molecule with two or three atoms bonded to form a straight line. Bond angle is 180 degrees.'
    },
    bentGeometryDescriptionString: {
      value: 'Bent, molecule with a central atom bonded to two other atoms that form an angle. Bond angle varies below 120 degrees.'
    },
    tetrahedralGeometryDescriptionString: {
      value: 'Tetrahedral, molecule with a central atom bonded to four other atoms forming a tetrahedron with 109.5° angles between them, like four-sided dice.'
    },
    shortStretchingAlertString: {
      value: 'Stretching.'
    },
    longStretchingAlertString: {
      value: 'Bonds of molecule stretching.'
    },
    shortBendingAlertString: {
      value: 'Bending.'
    },
    longBendingAlertString: {
      value: 'Bonds of molecule bend up and down.'
    },
    shortRotatingAlertString: {
      value: 'Rotating.'
    },
    longRotatingAlertString: {
      value: 'Molecule rotates.'
    },
    shortGlowingAlertString: {
      value: 'Glowing.'
    },
    longGlowingAlertString: {
      value: 'Molecule glows.'
    },
    breaksApartAlertPatternString: {
      value: 'Molecule breaks apart into {{firstMolecule}} and {{secondMolecule}}. Return molecule button appears.'
    },
    clockwiseString: {
      value: 'clockwise'
    },
    counterClockwiseString: {
      value: 'counter clockwise'
    },
    lightSourceOffString: {
      value: 'light source off'
    },
    emissionRatePatternString: {
      value: '{{lightSource}} photon emits {{emissionRate}}'
    },
    verySlowString: {
      value: 'very slow'
    },
    slowString: {
      value: 'slow'
    },
    fastString: {
      value: 'fast'
    },
    fastestString: {
      value: 'fastest'
    },
    pausedEmittingPatternString: {
      value: 'Absorbed {{lightSource}} photon emitting from {{molecularName}} molecule {{direction}}.'
    },
    pausedPassingPatternString:  {
      value: '{{lightSource}} photons passing through {{molecularName}} molecule.'
    },
    slowMotionVibratingPatternString: {
      value: 'Photon absorbed. Bonds of molecule {{excitedRepresentation}}.'
    },
    slowMotionAbsorbedPatternString: {
      value: 'Photon absorbed. Molecule {{excitedRepresentation}}.'
    },
    slowMotionBreakApartPatternString: {
      value: 'Photon absorbed. Molecule breaks apart. {{firstMolecule}} and {{secondMolecule}} float away.'
    },
    slowMotionEmittedPatternString: {
      value: 'Photon emitted {{direction}}.'
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
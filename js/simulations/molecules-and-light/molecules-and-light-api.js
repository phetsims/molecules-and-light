// Copyright 2015-2016, University of Colorado Boulder

/**
 * This is the public API for the Molecules and Light sim.  It can be used in concert with phetio.js and phetioEvents.js for
 * API simulation features.
 *
 * Conventions:
 * 1. Property names should start with the screen name. This will enable usage in sims where screens are mixed and matced
 * 2. Most components will be top level within the screen.  Sometime nested structure is valuable for composite items
 * 3. UI components have the component type as the suffix, such as showTimerButton.  Model components do not have a suffix
 *      such as concentrationScreen.solute
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
// Permit uppercase function names, such as TProperty(string)
define( function( require ) {
  'use strict';

  // modules
  var phetio = require( 'PHET_IO/phetio' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TBoolean = require( 'PHET_IO/types/TBoolean' );
  var TPushButton = require( 'PHET_IO/types/sun/buttons/TPushButton' );
  var THSlider = require( 'PHET_IO/types/sun/THSlider' );
  var TMolecule = require( 'PHET_IO/simulations/molecules-and-light/TMolecule' );
  var TNumber = require( 'PHET_IO/types/TNumber' );
  var TObservableArray = require( 'PHET_IO/types/axon/TObservableArray' );
  var TPhoton = require( 'PHET_IO/simulations/molecules-and-light/TPhoton' );
  var TProperty = require( 'PHET_IO/types/axon/TProperty' );
  var TResetAllButton = require( 'PHET_IO/types/sun/buttons/TResetAllButton' );
  var TRadioButton = require( 'PHET_IO/types/sun/buttons/TRadioButton' );
  var TString = require( 'PHET_IO/types/TString' );
  var TTandemText = require( 'PHET_IO/types/tandem/scenery/nodes/TTandemText' );
  var TToggleButton = require( 'PHET_IO/types/sun/buttons/TToggleButton' );

  // Use explicit names for id keys so they will match what researchers see in data files
  // Use id and type instead of phetioID and typeID to simplify things for researchers
  // Use a map so that JS will help us check that there are no duplicate names.
  var moleculesAndLightAPI = ( {
    moleculesAndLight: ( {
      moleculesAndLightScreen: {
        model: {

          // model properties
          emissionFrequencyProperty: TProperty( TNumber( { units: 'hertz' } ) ),
          photonWavelengthProperty: TProperty( TNumber( { units: 'meters' } ) ),
          photonTargetProperty: TProperty( TString, {
            values: [
              'SINGLE_CO_MOLECULE',
              'SINGLE_N2_MOLECULE',
              'SINGLE_O2_MOLECULE',
              'SINGLE_CO2_MOLECULE',
              'SINGLE_H2O_MOLECULE',
              'SINGLE_NO2_MOLECULE',
              'SINGLE_O3_MOLECULE'
            ]
          } ),
          runningProperty: TProperty( TBoolean ),
          photons: TObservableArray( TPhoton ),
          molecules: TObservableArray( TMolecule )
        },
        view: {

          playPauseButton: TToggleButton( TBoolean ),
          stepButton: TPushButton,
          showLightSpectrumButton: TPushButton,

          resetAllButton: TResetAllButton,

          spectrumWindow: {
            closeButton: TPushButton,
            shownProperty: TProperty( TBoolean )
          },
          moleculeControlPanel: {
            // molecule selection radio buttons
            singleCOMoleculeRadioButton: TRadioButton( TString ),
            singleN2MoleculeRadioButton: TRadioButton( TString ),
            singleO2MoleculeRadioButton: TRadioButton( TString ),
            singleCO2MoleculeRadioButton: TRadioButton( TString ),
            singleH2OMoleculeRadioButton: TRadioButton( TString ),
            singleNO2MoleculeRadioButton: TRadioButton( TString ),
            singleO3MoleculeRadioButton: TRadioButton( TString )
          },
          photonEmissionControlPanel: {
            microwaveRadioButton: TRadioButton( TNumber( { units: 'meters' } ) ),
            microwaveRadioButtonLabel: TTandemText,

            infraredRadioButton: TRadioButton( TNumber( { units: 'meters' } ) ),
            infraredRadioButtonLabel: TTandemText,

            visibleRadioButton: TRadioButton( TNumber( { units: 'meters' } ) ),
            visibleRadioButtonLabel: TTandemText,

            ultravioletRadioButton: TRadioButton( TNumber( { units: 'meters' } ) ),
            ultravioletRadioButtonLabel: TTandemText
          },
          observationWindow: {
            // photon selector radio buttons
            returnMoleculeButton: TPushButton,

            returnMoleculeButtonVisibleProperty: TProperty( TBoolean ),
            photonEmitterNode: {
              // Sliders, one for each emitter
              microwaveSlider: THSlider,
              infraredSlider: THSlider,
              visibleSlider: THSlider,
              ultravioletSlider: THSlider
            }
          }
        }
      }
    } )
  } );

  phetioNamespace.register( 'molecules-and-light-api', moleculesAndLightAPI );

  // Set the phetio.api after it was declared
  phetio.api = moleculesAndLightAPI;

  // Register phetio as a tandem instance after API assigned
  new Tandem( 'phetio' ).addInstance( phetio );

  return moleculesAndLightAPI;
} );


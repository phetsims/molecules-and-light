// Copyright 2002-2014, University of Colorado

/**
 * Class that represents carbon dioxide in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );
  var CarbonAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/CarbonAtom' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/VibrationStrategy' )

  /**
   *  Model data for Carbon Dioxide molecule
   */
  var INITIAL_CARBON_OXYGEN_DISTANCE = 170; // In picometers.

  // Deflection amounts used for the vibration of the CO2 atoms.  These
  // are calculated such that the actual center of gravity should remain
  // constant.
  var CARBON_MAX_DEFLECTION = 40;
  var OXYGEN_MAX_DEFLECTION = new CarbonAtom().getMass() * CARBON_MAX_DEFLECTION / ( 2 * new OxygenAtom().getMass() );


  function CO2( options ) {

    // Supertype constructor
    Molecule.call( this );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    // Instance data for the carbon dioxide molecule
    this.carbonAtom = new CarbonAtom();
    this.oxygenAtom1 = new OxygenAtom();
    this.oxygenAtom2 = new OxygenAtom();
    this.carbonOxygenBond1 = new AtomicBond( this.carbonAtom, this.oxygenAtom1, 2 );
    this.carbonOxygenBond2 = new AtomicBond( this.carbonAtom, this.oxygenAtom2, 2 );
    this.initialCenterOfGravityPos = options.initialCenterOfGravityPos;

    // Configure the base class.
    this.addAtom( this.carbonAtom );
    this.addAtom( this.oxygenAtom1 );
    this.addAtom( this.oxygenAtom2 );
    this.addAtomicBond( this.carbonOxygenBond1 );
    this.addAtomicBond( this.carbonOxygenBond2 );

    // Set up the photon wavelengths to absorb.
    this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new VibrationStrategy( this ) );

    // Set the initial offsets
    this.initializeAtomOffsets();

    // Set the initial COG position.
    this.setCenterOfGravityPosVec( this.initialCenterOfGravityPos );

  }

  return inherit( Molecule, CO2, {


  } )
} );


//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------
//
//
//  @Override
//  public void setVibration( double vibrationRadians ) {
//    super.setVibration( vibrationRadians );
//    double multFactor = Math.sin( vibrationRadians );
//    addInitialAtomCogOffset( carbonAtom, new MutableVector2D( 0, multFactor * CARBON_MAX_DEFLECTION ) );
//    addInitialAtomCogOffset( oxygenAtom1, new MutableVector2D( INITIAL_CARBON_OXYGEN_DISTANCE, -multFactor * OXYGEN_MAX_DEFLECTION ) );
//    addInitialAtomCogOffset( oxygenAtom2, new MutableVector2D( -INITIAL_CARBON_OXYGEN_DISTANCE, -multFactor * OXYGEN_MAX_DEFLECTION ) );
//    updateAtomPositions();
//  }
//
//  /* (non-Javadoc)
//   * @see edu.colorado.phet.common.photonabsorption.model.Molecule#initializeCogOffsets()
//   */
//  @Override
//  protected void initializeAtomOffsets() {
//    addInitialAtomCogOffset( carbonAtom, new MutableVector2D( 0, 0 ) );
//    addInitialAtomCogOffset( oxygenAtom1, new MutableVector2D( INITIAL_CARBON_OXYGEN_DISTANCE, 0 ) );
//    addInitialAtomCogOffset( oxygenAtom2, new MutableVector2D( -INITIAL_CARBON_OXYGEN_DISTANCE, 0 ) );
//
//    updateAtomPositions();
//  }
//}

// Copyright 2002-2014, University of Colorado

/**
 * Class that represents CH4 (methane) in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Vector2 = require( 'DOT/Vector2' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );
  var CarbonAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/CarbonAtom' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/VibrationStrategy' );
  var HydrogenAtom = require( 'MOLECULES_AND_LIGHT/photonAbsorptionModel/model/atoms/HydrogenAtom' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonAbsorptionModel/model/PhotonAbsorptionStrategy' );

  /**
   * Model data for methane.
   */

  var INITIAL_CARBON_HYDROGEN_DISTANCE = 170; // In picometers.

  // Assume that the angle from the carbon to the hydrogen is 45 degrees.
  var ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE = INITIAL_CARBON_HYDROGEN_DISTANCE * Math.sin( Math.PI / 4 );

  var HYDROGEN_VIBRATION_DISTANCE = 30;
  var HYDROGEN_VIBRATION_ANGLE = Math.PI / 4;
  var HYDROGEN_VIBRATION_DISTANCE_X = HYDROGEN_VIBRATION_DISTANCE * Math.cos( HYDROGEN_VIBRATION_ANGLE );
  var HYDROGEN_VIBRATION_DISTANCE_Y = HYDROGEN_VIBRATION_DISTANCE * Math.sin( HYDROGEN_VIBRATION_ANGLE );

  /**
   * Constructor for a Methane molecule.
   *
   * @param { PhotonAbsorptionModel } model - The model which holds this molecule
   * @param { Object } options
   * @constructor
   */
  function CH4( model, options ) {


    // Supertype constructor
    Molecule.call( this, model );

    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: new Vector2( 0, 0 ) // initial center of gravity position of the molecule
    }, options );
    this.options = options;

    // Instance data for the CH4 molecule.
    this.carbonAtom = new CarbonAtom();
    this.hydrogenAtom1 = new HydrogenAtom();
    this.hydrogenAtom2 = new HydrogenAtom();
    this.hydrogenAtom3 = new HydrogenAtom();
    this.hydrogenAtom4 = new HydrogenAtom();
    this.carbonHydrogenBond1 = new AtomicBond( this.carbonAtom, this.hydrogenAtom1, 1 );
    this.carbonHydrogenBond2 = new AtomicBond( this.carbonAtom, this.hydrogenAtom2, 1 );
    this.carbonHydrogenBond3 = new AtomicBond( this.carbonAtom, this.hydrogenAtom3, 1 );
    this.carbonHydrogenBond4 = new AtomicBond( this.carbonAtom, this.hydrogenAtom4, 1 );

    // Configure the base class.
    this.addAtom( this.carbonAtom );
    this.addAtom( this.hydrogenAtom1 );
    this.addAtom( this.hydrogenAtom2 );
    this.addAtom( this.hydrogenAtom3 );
    this.addAtom( this.hydrogenAtom4 );
    this.addAtomicBond( this.carbonHydrogenBond1 );
    this.addAtomicBond( this.carbonHydrogenBond2 );
    this.addAtomicBond( this.carbonHydrogenBond3 );
    this.addAtomicBond( this.carbonHydrogenBond4 );

    // Set up the photon wavelengths to absorb.
    this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new PhotonAbsorptionStrategy( this ) );

    // Set the initial offsets.
    this.initializeAtomOffsets();

    // Set the initial COG position.
    this.setCenterOfGravityPos( this.inititialCenterOfGravityPos );

  }

} );

//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------
//
//  /* (non-Javadoc)
//   * @see edu.colorado.phet.common.photonabsorption.model.Molecule#initializeCogOffsets()
//   */
//  @Override
//  protected void initializeAtomOffsets() {
//    addInitialAtomCogOffset( carbonAtom, new MutableVector2D( 0, 0 ) );
//    addInitialAtomCogOffset( hydrogenAtom1, new MutableVector2D( -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE,
//      ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE ) );
//    addInitialAtomCogOffset( hydrogenAtom2, new MutableVector2D( ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE,
//      ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE ) );
//    addInitialAtomCogOffset( hydrogenAtom3, new MutableVector2D( ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE,
//      -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE ) );
//    addInitialAtomCogOffset( hydrogenAtom4, new MutableVector2D( -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE,
//      -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE ) );
//
//    updateAtomPositions();
//  }
//
//  @Override
//  public void setVibration( double vibrationRadians ) {
//    super.setVibration( vibrationRadians );
//    if ( vibrationRadians != 0 ) {
//      double multFactor = Math.sin( vibrationRadians );
//      addInitialAtomCogOffset( hydrogenAtom1,
//        new MutableVector2D( -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_X,
//            ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_Y ) );
//      addInitialAtomCogOffset( hydrogenAtom2,
//        new MutableVector2D( ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE - multFactor * HYDROGEN_VIBRATION_DISTANCE_X,
//            ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_Y ) );
//      addInitialAtomCogOffset( hydrogenAtom3,
//        new MutableVector2D( -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE - multFactor * HYDROGEN_VIBRATION_DISTANCE_X,
//            -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_Y ) );
//      addInitialAtomCogOffset( hydrogenAtom4,
//        new MutableVector2D( ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_X,
//            -ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE + multFactor * HYDROGEN_VIBRATION_DISTANCE_Y ) );
//
//      // Position the carbon atom so that the center of mass of the
//      // molecule remains the same.
//      double carbonXPos = -( HydrogenAtom.MASS / CarbonAtom.MASS ) *
//                          ( getInitialAtomCogOffset( hydrogenAtom1 ).getX() + getInitialAtomCogOffset( hydrogenAtom2 ).getX() +
//                            getInitialAtomCogOffset( hydrogenAtom3 ).getX() + getInitialAtomCogOffset( hydrogenAtom4 ).getX() );
//      double carbonYPos = -( HydrogenAtom.MASS / CarbonAtom.MASS ) *
//                          ( getInitialAtomCogOffset( hydrogenAtom1 ).getY() + getInitialAtomCogOffset( hydrogenAtom2 ).getY() +
//                            getInitialAtomCogOffset( hydrogenAtom3 ).getY() + getInitialAtomCogOffset( hydrogenAtom4 ).getY() );
//      addInitialAtomCogOffset( carbonAtom, new MutableVector2D( carbonXPos, carbonYPos ) );
//    }
//    else {
//      initializeAtomOffsets();
//    }
//    updateAtomPositions();
//  }
//}

// Copyright 2002-2014, University of Colorado

/**
 * Class that represents water (H2O) in the model.
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
  var RotationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/RotationStrategy' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/VibrationStrategy' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );
  var HydrogenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/HydrogenAtom' );

  // Model Data for the water molecule
  // These constants define the initial shape of the water atom.  The angle
  // between the atoms is intended to be correct, and the bond is somewhat
  // longer than real life.  The algebraic calculations are intended to make
  // it so that the bond length and/or the angle could be changed and the
  // correct center of gravity will be maintained.
  var OXYGEN_HYDROGEN_BOND_LENGTH = 130;
  var INITIAL_HYDROGEN_OXYGEN_HYDROGEN_ANGLE = 109 * Math.PI / 180;
  var INITIAL_MOLECULE_HEIGHT = OXYGEN_HYDROGEN_BOND_LENGTH * Math.cos( INITIAL_HYDROGEN_OXYGEN_HYDROGEN_ANGLE / 2 );
  var TOTAL_MOLECULE_MASS = OxygenAtom.MASS + ( 2 * HydrogenAtom.MASS );
  var INITIAL_OXYGEN_VERTICAL_OFFSET = INITIAL_MOLECULE_HEIGHT * ( ( 2 * HydrogenAtom.MASS ) / TOTAL_MOLECULE_MASS );
  var INITIAL_HYDROGEN_VERTICAL_OFFSET = -( INITIAL_MOLECULE_HEIGHT - INITIAL_OXYGEN_VERTICAL_OFFSET );
  var INITIAL_HYDROGEN_HORIZONTAL_OFFSET = OXYGEN_HYDROGEN_BOND_LENGTH * Math.sin( INITIAL_HYDROGEN_OXYGEN_HYDROGEN_ANGLE / 2 );

  function H20( options ) {
    // Supertype constructor
    Molecule.call( this );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    // Instance Data
    this.oxygenAtom = new OxygenAtom();
    this.hydrogenAtom1 = new HydrogenAtom();
    this.hydrogenAtom2 = new HydrogenAtom();
    this.oxygenHydrogenBond1 = new AtomicBond( oxygenAtom, hydrogenAtom1, 1 );
    this.oxygenHydrogenBond2 = new AtomicBond( oxygenAtom, hydrogenAtom2, 1 );
    this.initialCenterOfGravityPos = options.initialCenterOfGravityPos;

    // Configure the base class.
    this.addAtom( this.oxygenAtom );
    this.addAtom( this.hydrogenAtom1 );
    this.addAtom( this.hydrogenAtom2 );
    this.addAtomicBond( this.oxygenHydrogenBond1 );
    this.addAtomicBond( this.oxygenHydrogenBond2 );

    // Set up the photon wavelengths to absorb.
    this.setPhotonAbsorptionStrategy( WavelengthConstants.MICRO_WAVELENGTH, new RotationStrategy( this ) );
    this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new VibrationStrategy( this ) );

    // Set the initial offsets.
    this.initializeAtomOffsets();

    // Set the initial center of gravity position.
    this.setCenterOfGravityPosVec( this.inititialCenterOfGravityPos );


  }

  return inherit( Molecule, H20, {
    /**
     * Initialize and set the initial center of gravity  locations for
     * each atom in this molecule.
     */
    initializeAtomOffsets: function() {
      this.addInitialAtomCogOffset( this.oxygenAtom, new Vector2( 0, INITIAL_OXYGEN_VERTICAL_OFFSET ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom1, new Vector2( INITIAL_HYDROGEN_HORIZONTAL_OFFSET, INITIAL_HYDROGEN_VERTICAL_OFFSET ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom2, new Vector2( -INITIAL_HYDROGEN_HORIZONTAL_OFFSET, INITIAL_HYDROGEN_VERTICAL_OFFSET ) );
      this.updateAtomPositions();
    },

    /**
     * Set the vibration behavior for this water molecule.  Set the current angle in vibration cycle,
     * udate center of gravity offsets, and update the atom positions.
     * @param {Number} vibrationRadians - The current angle of the vibration cycle.
     */
    setVibration: function( vibrationRadians ) {
      Molecule.prototype.setVibration.call( vibrationRadians );
      var multFactor = Math.sin( vibrationRadians );
      var maxOxygenDisplacement = 3;
      var maxHydrogenDisplacement = 18;
      this.addInitialAtomCogOffset( this.oxygenAtom, new Vector2( 0, INITIAL_OXYGEN_VERTICAL_OFFSET - multFactor * maxOxygenDisplacement ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom1, new Vector2( INITIAL_HYDROGEN_HORIZONTAL_OFFSET + multFactor * maxHydrogenDisplacement,
          INITIAL_HYDROGEN_VERTICAL_OFFSET + multFactor * maxHydrogenDisplacement ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom2, new Vector2( -INITIAL_HYDROGEN_HORIZONTAL_OFFSET - multFactor * maxHydrogenDisplacement,
          INITIAL_HYDROGEN_VERTICAL_OFFSET + multFactor * maxHydrogenDisplacement ) );
      this.updateAtomPositions();
    }
  } )

} );


// Copyright 2002-2014, University of Colorado

/**
 * Class that represents ozone (O3) in the model.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var RotationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/RotationStrategy' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/VibrationStrategy' );
  var BreakApartStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/BreakApartStrategy' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );
  var O = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/O' );
  var O2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/O2' );

  // Model data for the O3 molecule
  // These constants define the initial shape of the O3 atom.  The angle
  // between the atoms is intended to be correct, and the bond is somewhat
  // longer than real life.  The algebraic calculations are intended to make
  // it so that the bond length and/or the angle could be changed and the
  // correct center of gravity will be maintained.
  var OXYGEN_OXYGEN_BOND_LENGTH = 180;
  var INITIAL_OXYGEN_OXYGEN_OXYGEN_ANGLE = 120 * Math.PI / 180; // In radians.
  var INITIAL_MOLECULE_HEIGHT = OXYGEN_OXYGEN_BOND_LENGTH * Math.cos( INITIAL_OXYGEN_OXYGEN_OXYGEN_ANGLE / 2 );
  var INITIAL_MOLECULE_WIDTH = 2 * OXYGEN_OXYGEN_BOND_LENGTH * Math.sin( INITIAL_OXYGEN_OXYGEN_OXYGEN_ANGLE / 2 );
  var INITIAL_CENTER_OXYGEN_VERTICAL_OFFSET = 2.0 / 3.0 * INITIAL_MOLECULE_HEIGHT;
  var INITIAL_OXYGEN_VERTICAL_OFFSET = -INITIAL_CENTER_OXYGEN_VERTICAL_OFFSET / 2;
  var INITIAL_OXYGEN_HORIZONTAL_OFFSET = INITIAL_MOLECULE_WIDTH / 2;
  var BREAK_APART_VELOCITY = 3.0;

  //Random number generator.  Used to control the side on which the delocalized
  // bond is depicted.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    },
    nextBoolean: function() {
      return RAND.nextDouble() < 0.50;
    }
  };

  /**
   * Constructor for an ozone molecule.
   *
   * @param { PhotonAbsorptionModel } model - The model which holds this molecule
   * @param { Object } options
   * @constructor
   */
  function O3( model, options ) {
    // Supertype constructor
    Molecule.call( this, model );

    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: new Vector2( 0, 0 ) // center of gravity position for the molecule
    }, options );
    this.options = options;

    this.model = model;

    // Instance Data
    this.centerOxygenAtom = new OxygenAtom();
    this.leftOxygenAtom = new OxygenAtom();
    this.rightOxygenAtom = new OxygenAtom();
    this.initialCenterOfGravityPos = options.initialCenterOfGravityPos;

    // Tracks the side on which the double bond is shown.  More on this where
    // it is initialized.
    this.doubleBondOnRight = RAND.nextBoolean();

    // Create the bond structure.  O3 has a type of bond where each O-O
    // has essentially 1.5 bonds, so we randomly choose one side to show
    // two bonds and another to show one.
    if ( this.doubleBondOnRight ) {
      this.leftOxygenOxygenBond = new AtomicBond( this.centerOxygenAtom, this.leftOxygenAtom, { bondCount: 1 } );
      this.rightOxygenOxygenBond = new AtomicBond( this.centerOxygenAtom, this.rightOxygenAtom, { bondCount: 2 } );
    }
    else {
      this.leftOxygenOxygenBond = new AtomicBond( this.centerOxygenAtom, this.leftOxygenAtom, { bondCount: 2 } );
      this.rightOxygenOxygenBond = new AtomicBond( this.centerOxygenAtom, this.rightOxygenAtom, { bondCount: 1 } );
    }

    // Configure the base class.
    this.addAtom( this.centerOxygenAtom );
    this.addAtom( this.leftOxygenAtom );
    this.addAtom( this.rightOxygenAtom );
    this.addAtomicBond( this.leftOxygenOxygenBond );
    this.addAtomicBond( this.rightOxygenOxygenBond );

    // Set up the photon wavelengths to absorb.
    this.setPhotonAbsorptionStrategy( WavelengthConstants.MICRO_WAVELENGTH, new RotationStrategy( this ) );
    this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new VibrationStrategy( this ) );
    this.setPhotonAbsorptionStrategy( WavelengthConstants.UV_WAVELENGTH, new BreakApartStrategy( this ) );

    // Set the initial offsets.
    this.initializeAtomOffsets();

    // Set the initial center of gravity position.
    this.setCenterOfGravityPosVec( this.initialCenterOfGravityPos );

  }

  return inherit( Molecule, O3, {

    /**
     * Initialize and set the COG positions for each atom in this molecule.  These are the atom positions
     * when the molecule is at rest (not rotating or vibrating).
     */
    initializeAtomOffsets: function() {
      this.addInitialAtomCogOffset( this.centerOxygenAtom, new Vector2( 0, INITIAL_CENTER_OXYGEN_VERTICAL_OFFSET ) );
      this.addInitialAtomCogOffset( this.leftOxygenAtom, new Vector2( -INITIAL_OXYGEN_HORIZONTAL_OFFSET, INITIAL_OXYGEN_VERTICAL_OFFSET ) );
      this.addInitialAtomCogOffset( this.rightOxygenAtom, new Vector2( INITIAL_OXYGEN_HORIZONTAL_OFFSET, INITIAL_OXYGEN_VERTICAL_OFFSET ) );

      this.updateAtomPositions();
    },

    /**
     * Set the vibration behavior for this O3 molecule.  Sets the O3 molecule to a vibrating state then
     * calculates and sets the new position for each atom in the molecule.
     *
     * @param {Number} vibrationRadians - Where this molecule is in its vibration cycle in radians.
     */
    setVibration: function( vibrationRadians ) {
      Molecule.prototype.setVibration.call( vibrationRadians );
      var multFactor = Math.sin( vibrationRadians );
      var maxCenterOxygenDisplacement = 30;
      var maxOuterOxygenDisplacement = 15;
      this.getVibrationAtomOffset( this.centerOxygenAtom ).setXY( 0, multFactor * maxCenterOxygenDisplacement );
      this.getVibrationAtomOffset( this.rightOxygenAtom ).setXY( -multFactor * maxOuterOxygenDisplacement, -multFactor * maxOuterOxygenDisplacement );
      this.getVibrationAtomOffset( this.leftOxygenAtom ).setXY( multFactor * maxOuterOxygenDisplacement, -multFactor * maxOuterOxygenDisplacement );
      this.updateAtomPositions();
    },

    /**
     * Define the break apart behavior for the O3 molecule.  Initializes and sets the velocity of constituent molecules.
     * TODO: I had to re-declare the BREAK_APART_VELOCITY so that it could be used in this function.  Is there a way for NO2.js to find global variables in Molecules.js?
     */
    breakApart: function() {

      // Remove this O3 molecule from the the photon absorption model's list of active molecules.
      this.model.activeMolecules.remove( this );

      // Create the constituent molecules that result from breaking apart and add them to the active molecules observable array.
      var diatomicOxygenMolecule = new O2( this.model );
      var singleOxygenMolecule = new O( this.model );
      this.model.activeMolecules.add( diatomicOxygenMolecule );
      this.model.activeMolecules.add( singleOxygenMolecule );

      // Set up the direction and velocity of the constituent molecules.
      // These are set up mostly to look good, and their directions and
      // velocities have little if anything to do with any physical rules
      // of atomic dissociation.
      var diatomicMoleculeRotationAngle = ( ( Math.PI / 2 ) - ( INITIAL_OXYGEN_OXYGEN_OXYGEN_ANGLE / 2 ) );
      var breakApartAngle;
      if ( this.doubleBondOnRight ) {
        diatomicOxygenMolecule.rotate( -diatomicMoleculeRotationAngle );
        diatomicOxygenMolecule.setCenterOfGravityPos( ( this.getInitialAtomCogOffset( this.rightOxygenAtom ).x + this.getInitialAtomCogOffset( this.centerOxygenAtom ).x ) / 2,
            ( this.getInitialAtomCogOffset( this.centerOxygenAtom ).y + this.getInitialAtomCogOffset( this.rightOxygenAtom ).y ) / 2 );
        breakApartAngle = Math.PI / 4 + RAND.nextDouble() * Math.PI / 4;
        singleOxygenMolecule.setCenterOfGravityPos( -INITIAL_OXYGEN_HORIZONTAL_OFFSET, INITIAL_OXYGEN_VERTICAL_OFFSET );
      }
      else {
        diatomicOxygenMolecule.rotate( diatomicMoleculeRotationAngle );
        breakApartAngle = Math.PI / 2 + RAND.nextDouble() * Math.PI / 4;
        diatomicOxygenMolecule.setCenterOfGravityPos( ( this.getInitialAtomCogOffset( this.leftOxygenAtom ).x + this.getInitialAtomCogOffset( this.centerOxygenAtom ).x ) / 2,
            ( this.getInitialAtomCogOffset( this.leftOxygenAtom ).y + this.getInitialAtomCogOffset( this.centerOxygenAtom ).y ) / 2 );
        singleOxygenMolecule.setCenterOfGravityPos( INITIAL_OXYGEN_HORIZONTAL_OFFSET, INITIAL_OXYGEN_VERTICAL_OFFSET );
      }
      diatomicOxygenMolecule.setVelocity( BREAK_APART_VELOCITY * 0.33 * Math.cos( breakApartAngle ), BREAK_APART_VELOCITY * 0.33 * Math.sin( breakApartAngle ) );
      singleOxygenMolecule.setVelocity( -BREAK_APART_VELOCITY * 0.67 * Math.cos( breakApartAngle ), -BREAK_APART_VELOCITY * 0.67 * Math.sin( breakApartAngle ) );

      // Add these constituent molecules to the constituent list.
      this.addConstituentMolecule( diatomicOxygenMolecule );
      this.addConstituentMolecule( singleOxygenMolecule );

    }
  } )

} );
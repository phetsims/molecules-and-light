// Copyright 2014-2018, University of Colorado Boulder

/**
 * Class that represents CH4 (methane) in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Atom = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/atoms/Atom' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/atoms/AtomicBond' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/Molecule' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var Vector2 = require( 'DOT/Vector2' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/VibrationStrategy' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/WavelengthConstants' );

  // Model Data for Methane
  var INITIAL_CARBON_HYDROGEN_DISTANCE = 170; // In picometers.

  // Assume that the angle from the carbon to the hydrogen is 45 degrees.
  // var ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE = INITIAL_CARBON_HYDROGEN_DISTANCE * Math.sin( Math.PI / 4 );

  var HYDROGEN_VIBRATION_DISTANCE = 30;
  var HYDROGEN_VIBRATION_ANGLE = Math.PI / 8;
  var HYDROGEN_VIBRATION_DISTANCE_X = HYDROGEN_VIBRATION_DISTANCE * Math.cos( HYDROGEN_VIBRATION_ANGLE );
  var HYDROGEN_VIBRATION_DISTANCE_Y = HYDROGEN_VIBRATION_DISTANCE * Math.sin( HYDROGEN_VIBRATION_ANGLE );

  // function getHydrogenVibrationDistanceVector( angle, multFactor ) {
  //   var y = HYDROGEN_VIBRATION_DISTANCE * Math.sin( angle );
  //   var x = HYDROGEN_VIBRATION_DISTANCE * Math.cos( angle );
  //   var vec = ROTATED_INITIAL_CARBON_HYDROGEN_DISTANCE - multFactor * HYDROGEN_VIBRATION_DISTANCE_X
  //   return new Vector2( x, y );
  // }

  function getInitialRotatedYDistance ( angle ) {
    return INITIAL_CARBON_HYDROGEN_DISTANCE * Math.sin( angle );
  }
  function getInitialRotatedXDistance ( angle ) {
    return INITIAL_CARBON_HYDROGEN_DISTANCE * Math.cos( angle );
  }
  // atom offsets for 3d
  var atom1Angle = Math.PI * 1.95;
  var atom2Angle = Math.PI / 2;
  var atom3Angle = Math.PI * 1.15;
  var atom4Angle = Math.PI * 1.575;
  var atom1OffsetY = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.sin( atom1Angle );
  var atom1OffsetX = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.cos( atom1Angle );
  var atom2OffsetY = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.sin( atom2Angle );
  var atom2OffsetX = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.cos( atom2Angle );
  var atom3OffsetY = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.sin( atom3Angle );
  var atom3OffsetX = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.cos( atom3Angle );
  var atom4OffsetY = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.sin( atom4Angle );
  var atom4OffsetX = (INITIAL_CARBON_HYDROGEN_DISTANCE) * Math.cos( atom4Angle );

  /**
   * Constructor for a Methane molecule.
   *
   * @param {Object} options
   * @constructor
   */
  function CH4( options ) {

    // Supertype constructor
    Molecule.call( this, options );

    // Instance data for the CH4 molecule - @private
    this.carbonAtom = Atom.carbon();
    this.hydrogenAtom1 = Atom.hydrogen();
    this.hydrogenAtom2 = Atom.hydrogen();
    this.hydrogenAtom3 = Atom.hydrogen();
    this.hydrogenAtom4 = Atom.hydrogen();
    this.atomicBond1 = new AtomicBond( this.carbonAtom, this.hydrogenAtom1, { top: 'first' } );
    this.atomicBond2 = new AtomicBond( this.carbonAtom, this.hydrogenAtom2, { top: 'second' } );
    this.atomicBond3 = new AtomicBond( this.carbonAtom, this.hydrogenAtom3 );
    this.atomicBond4 = new AtomicBond( this.carbonAtom, this.hydrogenAtom4, { top: 'second' } );

    // Configure the base class.
    this.addAtom( this.carbonAtom );
    this.addAtom( this.hydrogenAtom1 );
    this.addAtom( this.hydrogenAtom2 );
    this.addAtom( this.hydrogenAtom3 );
    this.addAtom( this.hydrogenAtom4 );
    this.addAtomicBond( this.atomicBond1 );
    this.addAtomicBond( this.atomicBond2 );
    this.addAtomicBond( this.atomicBond3 );
    this.addAtomicBond( this.atomicBond4 );

    // Set up the photon wavelengths to absorb.
    this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new VibrationStrategy( this ) );

    // Set the initial offsets.
    this.initializeAtomOffsets();

    // for 3d rendering of the molecule
    // within each layer, the bonds will be behind the atom
    // layers will be added to the scene graph in order, so earlier layers will appear behind later ones
    this.layers = [
      {
        bonds: null,
        atoms: [ this.hydrogenAtom1 ]
      },
      {
        atoms: [ this.carbonAtom, this.hydrogenAtom3 ],
        bonds: [ this.atomicBond1, this.atomicBond3 ]
      },
      {
        atoms: [ this.hydrogenAtom2, this.hydrogenAtom4 ],
        bonds: [ this.atomicBond2, this.atomicBond4 ]
      }
    ];

  }

  moleculesAndLight.register( 'CH4', CH4 );

  return inherit( Molecule, CH4, {

    /**
     * Set the initial positions of the atoms which compose this molecule.
     */
    initializeAtomOffsets: function() {

      this.addInitialAtomCogOffset( this.carbonAtom, new Vector2( 0, 0 ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom1, new Vector2( atom1OffsetX, atom1OffsetY ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom2, new Vector2( atom2OffsetX, atom2OffsetY ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom3, new Vector2( atom3OffsetX, atom3OffsetY ) );
      this.addInitialAtomCogOffset( this.hydrogenAtom4, new Vector2( atom4OffsetX, atom4OffsetY ) );

      this.updateAtomPositions();

    },

    /**
     * Set the vibration behavior for this CH4 molecule. Initialize and set center of gravity position offsets for the
     * composing atoms in its vibration cycle.
     *
     * @param {number} vibrationRadians - Where this molecule is in its vibration cycle in radians.
     */
    setVibration: function( vibrationRadians ) {

      // Molecule.prototype.setVibration.call( this, vibrationRadians );

      this.currentVibrationRadians = vibrationRadians;
      var multFactorY = Math.sin( vibrationRadians );
      // var multFactorX = Math.cos( vibrationRadians );

      if ( vibrationRadians !== 0 ) {
        this.addInitialAtomCogOffset( this.hydrogenAtom1, new Vector2(
          getInitialRotatedXDistance( atom1Angle ) - multFactorY * HYDROGEN_VIBRATION_DISTANCE_X * 0.3,
          getInitialRotatedYDistance( atom1Angle ) - multFactorY * HYDROGEN_VIBRATION_DISTANCE_Y * 3 ) );
        this.addInitialAtomCogOffset( this.hydrogenAtom2, new Vector2(
          getInitialRotatedXDistance( atom2Angle ) - multFactorY * HYDROGEN_VIBRATION_DISTANCE_X * 2.5,
          getInitialRotatedYDistance( atom2Angle ) - multFactorY * HYDROGEN_VIBRATION_DISTANCE_Y * 0.3 ) );
        this.addInitialAtomCogOffset( this.hydrogenAtom3, new Vector2(
          getInitialRotatedXDistance( atom3Angle ) - multFactorY * HYDROGEN_VIBRATION_DISTANCE_X * 0.3,
          getInitialRotatedYDistance( atom3Angle ) + multFactorY * HYDROGEN_VIBRATION_DISTANCE_Y * 3 ) );
        this.addInitialAtomCogOffset( this.hydrogenAtom4, new Vector2(
          getInitialRotatedXDistance( atom4Angle ) + multFactorY * HYDROGEN_VIBRATION_DISTANCE_X * 2.5,
          getInitialRotatedYDistance( atom4Angle ) + multFactorY * HYDROGEN_VIBRATION_DISTANCE_Y * 0.3 ) );

        // Position the carbon atom so that the center of mass of the molecule remains the same.
        // var carbonXPos = -( this.hydrogenAtom1.mass / this.carbonAtom.mass ) *
        //                  ( this.getInitialAtomCogOffset( this.hydrogenAtom1 ).x + this.getInitialAtomCogOffset( this.hydrogenAtom2 ).x +
        //                    this.getInitialAtomCogOffset( this.hydrogenAtom3 ).x + this.getInitialAtomCogOffset( this.hydrogenAtom4 ).x );
        // var carbonYPos = -( this.hydrogenAtom1.mass / this.carbonAtom.mass ) *
        //                  ( this.getInitialAtomCogOffset( this.hydrogenAtom1 ).y + this.getInitialAtomCogOffset( this.hydrogenAtom2 ).y +
        //                    this.getInitialAtomCogOffset( this.hydrogenAtom3 ).y + this.getInitialAtomCogOffset( this.hydrogenAtom4 ).y );
        // this.addInitialAtomCogOffset( this.carbonAtom, new Vector2( carbonXPos, carbonYPos ) );
      }

      else {
        this.initializeAtomOffsets();
      }

      this.updateAtomPositions();

    }

  } );
} );



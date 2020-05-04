// Copyright 2014-2020, University of Colorado Boulder

/**
 * Class that represents CO2 ( carbon dioxide ) in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import moleculesAndLight from '../../../moleculesAndLight.js';
import Atom from '../atoms/Atom.js';
import AtomicBond from '../atoms/AtomicBond.js';
import Molecule from '../Molecule.js';
import VibrationStrategy from '../VibrationStrategy.js';
import WavelengthConstants from '../WavelengthConstants.js';

// Model Data for the carbon dioxide molecule.
const INITIAL_CARBON_OXYGEN_DISTANCE = 170; // In picometers.

// Deflection amounts used for the vibration of the CO2 atoms.  These
// are calculated such that the actual center of gravity should remain
// constant.
const CARBON_MAX_DEFLECTION = 40;
const OXYGEN_MAX_DEFLECTION = Atom.carbon().mass * CARBON_MAX_DEFLECTION / ( 2 * Atom.oxygen().mass );

/**
 * Constructor for a carbon dioxide molecule.
 *
 * @param {Object} [options]
 * @constructor
 */
function CO2( options ) {

  // Supertype constructor
  Molecule.call( this, options );

  // Instance data for the carbon dioxide molecule
  // @private
  this.carbonAtom = Atom.carbon();
  this.oxygenAtom1 = Atom.oxygen();
  this.oxygenAtom2 = Atom.oxygen();

  // Configure the base class.
  this.addAtom( this.carbonAtom );
  this.addAtom( this.oxygenAtom1 );
  this.addAtom( this.oxygenAtom2 );
  this.addAtomicBond( new AtomicBond( this.carbonAtom, this.oxygenAtom1, { bondCount: 2 } ) );
  this.addAtomicBond( new AtomicBond( this.carbonAtom, this.oxygenAtom2, { bondCount: 2 } ) );

  // Set up the photon wavelengths to absorb.
  this.setPhotonAbsorptionStrategy( WavelengthConstants.IR_WAVELENGTH, new VibrationStrategy( this ) );

  // Set the initial offsets
  this.initializeAtomOffsets();

}

moleculesAndLight.register( 'CO2', CO2 );

inherit( Molecule, CO2, {

  /**
   * Set the vibration behavior for this CO2 molecule. Initialize and set center of gravity position offsets for the
   * composing atoms.
   *
   * @param {number} vibrationRadians Where this molecule is in its vibration cycle in radians.
   */
  setVibration: function( vibrationRadians ) {

    this.currentVibrationRadiansProperty.set( vibrationRadians );
    const multFactor = Math.sin( vibrationRadians );
    this.addInitialAtomCogOffset( this.carbonAtom, new Vector2( 0, multFactor * CARBON_MAX_DEFLECTION ) );
    this.addInitialAtomCogOffset( this.oxygenAtom1, new Vector2( INITIAL_CARBON_OXYGEN_DISTANCE, -multFactor * OXYGEN_MAX_DEFLECTION ) );
    this.addInitialAtomCogOffset( this.oxygenAtom2, new Vector2( -INITIAL_CARBON_OXYGEN_DISTANCE, -multFactor * OXYGEN_MAX_DEFLECTION ) );
    this.updateAtomPositions();

  },

  /**
   * Set the initial positions of the atoms which compose this molecule.
   */
  initializeAtomOffsets: function() {

    this.addInitialAtomCogOffset( this.carbonAtom, new Vector2( 0, 0 ) );
    this.addInitialAtomCogOffset( this.oxygenAtom1, new Vector2( INITIAL_CARBON_OXYGEN_DISTANCE, 0 ) );
    this.addInitialAtomCogOffset( this.oxygenAtom2, new Vector2( -INITIAL_CARBON_OXYGEN_DISTANCE, 0 ) );
    this.updateAtomPositions();

  }

} );

export default CO2;
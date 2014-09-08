//  Copyright 2002-2014, University of Colorado

/**
 * Original file is Molecule.java which is also used by "Greenhouse Gas".
 *
 * A model for a particular molecule.  This, by its nature, is
 * essentially a composition of other objects, generally atoms and atomic
 * bonds.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionStrategy' );
  var NullPhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/NullPhotonAbsorptionStrategy' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Photon' );
  var Atom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/Atom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );

  //------------------------------------------------------------------------
  // Class Data
  //------------------------------------------------------------------------
  var PHOTON_EMISSION_SPEED = 2; // Picometers per second.
  var PHOTON_ABSORPTION_DISTANCE = 100;

  //Random number generator.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    }
  };

  var VIBRATION_FREQUENCY = 5;  // Cycles per second of sim time.
  var ROTATION_RATE = 1.1;  // Revolutions per second of sim time.
  var ABSORPTION_HYSTERESIS_TIME = 200; // Milliseconds of sim time.

  // Scaler quantity representing the speed at which the constituent particles
  // move away from each other.  Note that this is a relative speed, not one
  // that is absolute in model space.
  var BREAK_APART_VELOCITY = 3.0;

  //------------------------------------------------------------------------
  // Instance Data
  //------------------------------------------------------------------------
  function Molecule( model ) {

    PropertySet.call( this, {
      emittedPhoton: null,
      highElectronicEnergyState: false
    } );

    // Atoms and bonds that comprise this molecule.
    this.atoms = []; // Elements are of type Atoms
    this.atomicBonds = []; // Elements are of type AtomicBonds

    // This is basically the location of the molecule, but it is specified as
    // the center of gravity since a molecule is a composite object.
    this.centerOfGravity = new Vector2();

    // Structure of the molecule in terms of offsets from the center of
    // gravity.  These indicate the atom's position in the "relaxed" (i.e.
    // non-vibrating), non-rotated state.
    this.initialAtomCogOffsets = {}; // Object contains keys of type Atoms ID and values of type Vector2

    // Vibration offsets - these represent the amount of deviation from the
    // initial (a.k.a relaxed) configuration for each molecule.
    this.vibrationAtomOffsets = {}; // Object contains keys of type Atoms ID and values of type Vector2

    //  Map containing the atoms which compose this molecule.  Allows us to call on each atom by their unique ID.
    this.atomsByID = {};  // Objects contains keys of the atom's uniqueID, and values of type atom.

    // Listeners to events that come from this molecule.
    this.listeners = []; // Elements are event listeners

    // Velocity for this molecule.
    this.velocity = new Vector2();

    // Map that matches photon wavelengths to photon absorption strategies.
    // The strategies contained in this structure define whether the
    // molecule can absorb a given photon and, if it does absorb it, how it
    // will react.
    // TODO: Declaration in original java is an empty hashmap, see if an arbitrary object is correct solution.
    // TODO: Requires Dependency PhotonAbsorptionStrategy
    this.mapWavelengthToAbsorptionStrategy = {}; // Object will contain keys of type Number and values of type PhotonAbsorptionStrategy

    // Currently active photon absorption strategy, active because a photon
    // was absorbed that activated it.
    // TODO: Requires Dependency PhotonAbsorptionStrategy
    this.activePhotonAbsorptionStrategy = new NullPhotonAbsorptionStrategy( this );

    // Variable that prevents reabsorption for a while after emitting a photon.
    this.absorbtionHysteresisCountdownTime = 0;

    // The "pass through photon list" keeps track of photons that were not
    // absorbed due to random probability (essentially a simulation of quantum
    // properties).  This is needed since the absorption of a given photon
    // will likely be tested at many time steps as the photon moves past the
    // molecule, and we don't want to keep deciding about the same photon.
    this.PASS_THROUGH_PHOTON_LIST_SIZE = 10;
    this.passThroughPhotonList = []; // Array will have size PASS_THROUGH_PHOTON_LIST_SIZE with type Photon.

    // The current point within this molecule's vibration sequence.
    this.currentVibrationRadians = 0;

    // The amount of rotation currently applied to this molecule.  This is
    // relative to its original, non-rotated state.
    this.currentRotationRadians = 0;

    // Boolean values that track whether the molecule is vibrating or
    // rotating.
    this.vibrating = false;
    this.rotating = false;
    this.rotationDirectionClockwise = true; // Controls the direction of rotation.

    // List of constituent molecules. This comes into play only when the
    // molecule breaks apart, which many of the molecules never do.
    this.constituentMolecules = []; // Elements of type Molecule

    this.photonAbsorptionModel = model;

  }

  return inherit( PropertySet, Molecule, {
    /**
     * Reset the molecule.  Any photons that have been absorbed are forgotten,
     * and any vibration is reset.
     * TODO: Implement PhotonAbsorptionStrategy for full porting
     **/
    reset: function() {
      this.activePhotonAbsorptionStrategy.reset();
      this.activePhotonAbsorptionStrategy = new PhotonAbsorptionStrategy.NullPhotonAbsorptionStrategy( this );
      this.absorbtionHysteresisCountdownTime = 0;
      this.setVibrating( false );
      this.setVibration( 0 );
      this.setRotating( false );
      this.setRotation( 0 );
    },

    setPhotonAbsorptionStrategy: function( wavelength, strategy ) {
      this.mapWavelengthToAbsorptionStrategy[ wavelength ] = strategy;
    },

    /**
     * Checks to see if a photon has been absorbed.
     *
     * @return {Boolean}
     */
    isPhotonAbsorbed: function() {
      // If there is an active non-null photon absorption strategy, it
      // indicates that a photon has been absorbed.
      // TODO: Requires PhotonAbsorptionStrategy before this can be called.
      //  return !( this.activePhotonAbsorptionStrategy instanceof PhotonAbsorptionStrategy.NullPhotonAbsorptionStrategy );
    },

    /**
     * Add an initial offset from the molecule's Center of Gravity (COG).
     * The offset is "initial" because this is where the atom should be when
     * it is not vibrating or rotating.
     *
     * TODO: Is there a better way to do the @param? Way to check for subclasses?
     * @param {Atom || CarbonAtom || HydrogenAtom || NitrogenAtom || OxygenAtom} atom
     * @param {Vector2} offset - Initial COG offset for when atom is not vibrating or rotating.
     */
    addInitialAtomCogOffset: function( atom, offset ) {
      // Check that the specified atom is a part of this molecule.  While it
      // would probably work to add the offsets first and the atoms later,
      // that's not how the sim was designed, so this is some enforcement of
      // the "add the atoms first" policy.
      assert && assert( this.atoms.indexOf( atom ) >= 0 );
      this.initialAtomCogOffsets[ atom.uniqueID ] = offset;
    },

    /**
     * Get the initial offset from the molecule's center of gravity (COG) for
     * the specified atom.
     *
     * @param {Atom} atom
     * @return {Vector2}
     **/
    getInitialAtomCogOffset: function( atom ) {
      if ( !atom.uniqueID in this.initialAtomCogOffsets ) {
        console.log( " - Warning: Attempt to get initial COG offset for atom that is not in molecule." );
      }
      return this.initialAtomCogOffsets[atom.uniqueID];
    },

    /**
     * Get the current vibration offset from the molecule's center of gravity
     * (COG) for the specified molecule.
     *
     * @param {Atom} atom
     * @return {Vector2} - Vector representing location of vibration offset from molecule's center of gravity.
     */
    getVibrationAtomOffset: function( atom ) {
      if ( !(atom.uniqueID in this.vibrationAtomOffsets) ) {
        console.log( " - Warning: Attempt to get vibrational COG offset for atom that is not in molecule." );
      }
      return this.vibrationAtomOffsets[atom.uniqueID];
    },

    /**
     * Add a "constituent molecule" to this molecule's list.  Constituent
     * molecules are what this molecule will break into if it breaks apart.
     * Note that this does NOT check for any sort of conservation of atoms,
     * so use this carefully or weird break apart behaviors could result.
     *
     * @param {Molecule} molecule
     **/
    addConstituentMolecule: function( molecule ) {
      this.constituentMolecules.push( molecule );
    },

    /**
     * Determine if the molecule is currently vibrating.
     *
     * @return {Boolean} vibrating
     */
    isVibrating: function() {
      return this.vibrating;
    },

    /**
     * Advance the molecule one step in time.
     *
     * @param {Number} dt - The change in time.
     * TODO: Requires the PhotonAbsorptionStrategy dependency file and setCenterOfGravityPos functions.
     **/
    step: function( dt ) {
      this.activePhotonAbsorptionStrategy.step( dt );

      if ( this.absorbtionHysteresisCountdownTime >= 0 ) {
        this.absorbtionHysteresisCountdownTime -= dt;
      }

      if ( this.vibrating ) {
        this.advanceVibration( dt * VIBRATION_FREQUENCY / 1000 * 2 * Math.PI );
      }

      if ( this.rotating ) {
        var directionMultiplier = this.rotationDirectionClockwise ? -1 : 1;
        this.rotate( dt * ROTATION_RATE / 1000 * 2 * Math.PI * directionMultiplier );
      }

      // Do any linear movement that is required.
      this.setCenterOfGravityPosVec( this.getDestination( this.centerOfGravity ) );
      this.setCenterOfGravityPos( this.centerOfGravity.x + this.velocity.x * dt, this.centerOfGravity.y + this.velocity.y * dt );
    },

    /**
     * Set the molecule state to vibrating.
     *
     * @param {Boolean} vibration
     **/
    setVibrating: function( vibration ) {
      this.vibrating = vibration;
    },

    /**
     * Determine if this molecule is currently rotating.
     *
     * @return {Boolean}
     **/
    isRotating: function() {
      return this.rotating;
    },

    /**
     * Set the current molecule state to vibrating.
     *
     * @param {Boolean} rotating
     **/
    setRotating: function( rotating ) {
      this.rotating = rotating;
    },

    /**
     * Set the molecule rotation direction to Clockwise.
     *
     * @param {Boolean} rotationDirectionClockwise
     **/
    setRotationDirectionClockwise: function( rotationDirectionClockwise ) {
      this.rotationDirectionClockwise = rotationDirectionClockwise;
    },

    /**
     * Add a listener to this molecules array of listeners.
     *
     * @param {Listener} listener
     * TODO: indexOf() will return -1 if item is not in array.  Make sure that this is ok.
     **/
    addListener: function( listener ) {
      // Don't bother adding if already there.
      if ( this.listeners.indexOf( listener ) === -1 ) {
        this.listeners.push( listener );
      }
    },

    /**
     * Remove a listener from this molecules array of listeners.
     *
     * @param {Listener} listener
     **/
    removeListener: function( listener ) {
      // find the listener in the array.
      var index = this.listeners.indexOf( listener );
      if ( index > -1 ) {
        this.listeners.splice( index, 1 );
      }
    },

    /**
     * Create a new Vector2 describing the location of this molecules center of gravity.
     *
     * @return {Vector2}
     **/
    getCenterOfGravityPos: function() {
      return new Vector2( this.centerOfGravity.x, this.centerOfGravity.y );
    },
    /**
     * Get the location of this molecules center of gravity.
     *
     * @return {Vector2} - centerOfGravity
     **/
    getCenterOfGravityPosRef: function() {
      return this.centerOfGravity;
    },

    /**
     * Set the location of this molecule by specifying the center of gravity.
     * This will be unique to each molecule's configuration, and it will cause
     * the individual molecules to be located such that the center of gravity
     * is in the specified location.  The relative orientation of the atoms
     * that comprise the molecules will not be changed.
     *
     * @param {Number} x - the x location to set
     * @param {Number} y - the y location to set
     **/
    setCenterOfGravityPos: function( x, y ) {
      if ( this.centerOfGravity.x != x || this.centerOfGravity.y != y ) {
        this.centerOfGravity.setXY( x, y );
        this.updateAtomPositions();
        //notifyCenterOfGravityPosChanged();
      }
    },

    /**
     * Set the location of this molecule by specifying the center of gravity.
     * Allows passing a Vector2 into setCenterOfGravityPos.
     *
     * @param {Vector2} centerOfGravityPos - A vector representing the desired location for this molecule
     **/
    setCenterOfGravityPosVec: function( centerOfGravityPos ) {
      this.setCenterOfGravityPos( centerOfGravityPos.x, centerOfGravityPos.y );
    },

    /**
     * Set the angle, in terms of radians from 0 to 2*PI, where this molecule
     * is in its vibration cycle.
     *
     * @param {Number} vibrationRadians - The angle describing where this molecule is in its vibration.
     **/
    setVibration: function( vibrationRadians ) {
      this.currentVibrationRadians = vibrationRadians;
      return;   // Implements no vibration by default, override in descendant classes as needed.
    },

    /**
     * Advance the vibration by the prescribed radians.
     *
     * @param {Number} deltaRadians - Change of vibration angle in radians.
     **/
    advanceVibration: function( deltaRadians ) {
      this.currentVibrationRadians += deltaRadians;
      this.setVibration( this.currentVibrationRadians );
    },


    /**
     * Rotate the molecule about the center of gravity by the specified number
     * of radians.
     *
     * @param {Number} deltaRadians - Change in radians of the Molecule's angle about the center of Gravity.
     **/
    rotate: function( deltaRadians ) {
      this.setRotation( ( this.currentRotationRadians + deltaRadians ) % ( Math.PI * 2 ) );
    },

    /**
     * Set the rotation angle of the Molecule in radians.
     *
     * @param {radians}
     **/

    setRotation: function( radians ) {
      if ( radians != this.currentRotationRadians ) {
        this.currentRotationRadians = radians;
        this.updateAtomPositions();
      }
    },

    /**
     * Get this Molecules current rotation angle in Radians.
     *
     * @return {Number} currentRotationRadians - The current angle of rotation.
     **/
    getRotation: function() {
      return this.currentRotationRadians;
    },

    /**
     * Enable/disable a molecule's high electronic energy state, which in the
     * real world is a state where one or more electrons has moved to a higher
     * orbit.  In this simulation, it is generally depicted by having the
     * molecule appear to glow.
     *
     * @param {Boolean} highElectronicEnergyState
     **/
    setHighElectronicEnergyState: function( highElectronicEnergyState ) {
      this.highElectronicEnergyStateProperty.set( highElectronicEnergyState );
    },

    /**
     * Determine if the Molecule is in a high energy state.
     *
     * @return {Boolean} highElectronEnergyState
     **/
    isHighElectronicEnergyState: function() {
      return this.highElectronicEnergyStateProperty.get();
    },

    /**
     * Cause the molecule to dissociate, i.e. to break apart.
     **/
    breakApart: function() {
      console.error( " Error: breakApart invoked on a molecule for which the action is not implemented." );
      assert && assert( false );
    },

    /**
     * Mark a photon for passing through the molecule.  This means that the photon
     * will not interact with the molecule.
     *
     * TODO: Requires the Photon dependency file.
     *
     * @param {Photon} photon - The photon to be passed through.
     **/
    markPhotonForPassThrough: function( photon ) {
      if ( this.passThroughPhotonList.length >= this.PASS_THROUGH_PHOTON_LIST_SIZE ) {
        // Make room for this photon be deleting the oldest one.
        this.passThroughPhotonList.shift();
      }
      this.passThroughPhotonList.push( photon );
    },

    /**
     * Determine if a photon is marked to be passed through this molecule.
     *
     * @param {Photon} photon
     * @return {Boolean}
     **/
    isPhotonMarkedForPassThrough: function( photon ) {
      if ( this.passThroughPhotonList.indexOf( photon ) === -1 ) {
        return false;
      }
      else {
        return true;
      }
    },

    /**
     * Create a new array containing the atoms which compose this molecule.
     *
     * @return {Array} - Array with elements of type Atom containing the atoms which compose this molecule.
     **/
    getAtoms: function() {
      return this.atoms.slice( 0 );
    },

    /**
     * Create a new array containing this Molecules atomic bonds.
     *
     * @return {Array} - Array with elements of type AtomicBond containing the atomic bonds which construct this molecule.
     **/
    getAtomicBonds: function() {
      return  this.atomicBonds.slice();
    },

    /**
     * Decide whether or not to absorb the offered photon.  If the photon is
     * absorbed, the matching absorption strategy is set so that it can
     * control the molecule's post-absorption behavior.
     *
     * TODO: Requires photonAbsorptionStrategy.js and Photon.js dependency files.
     *
     * @param {Photon} photon - The photon offered for absorption.
     * @return {Boolean} absorbPhoton
     **/
    queryAbsorbPhoton: function( photon ) {

      var absorbPhoton = false;

      if ( !this.isPhotonAbsorbed() &&
           this.absorbtionHysteresisCountdownTime <= 0 &&
           photon.getLocation().distance( this.getCenterOfGravityPos() ) < PHOTON_ABSORPTION_DISTANCE
        && !this.isPhotonMarkedForPassThrough( photon )
        ) {

        // The circumstances for absorption are correct, but do we have an
        // absorption strategy for this photon's wavelength?
        var candidateAbsorptionStrategy = this.mapWavelengthToAbsorptionStrategy[ photon.getWavelength() ];
        if ( candidateAbsorptionStrategy != null ) {
          // Yes, there is a strategy available for this wavelength.
          // Ask it if it wants the photon.
          if ( candidateAbsorptionStrategy.queryAndAbsorbPhoton( photon ) ) {
            // It does want it, so consider the photon absorbed.
            absorbPhoton = true;
            this.activePhotonAbsorptionStrategy = candidateAbsorptionStrategy;
            this.activePhotonAbsorptionStrategy.queryAndAbsorbPhoton( photon );
          }
          else {
            this.markPhotonForPassThrough( photon );//we have the decision logic once for whether a photon should be absorbed, so it is not queried a second time
          }
        }
      }

      return absorbPhoton;
    },

    /**
     * Set the photon absorption strategy for this molecule.
     *
     * @param {PhotonAbsorptionStrategy} activeStrategy - The strategy to be set.
     **/
    setActiveStrategy: function( activeStrategy ) {
      this.activePhotonAbsorptionStrategy = activeStrategy;
    },

    /**
     * Add an atom to the list of atoms which compose this molecule.
     *
     * TODO: Requires the Atom.js dependency file.
     *
     * @param {Atom} atom - The atom to be added
     **/
    addAtom: function( atom ) {
      this.atoms.push( atom );
      this.initialAtomCogOffsets[atom.uniqueID] = new Vector2( 0, 0 );
      this.vibrationAtomOffsets[atom.uniqueID] = new Vector2( 0, 0 );
      this.atomsByID[atom.uniqueID] = atom;
    },
    /**
     * Add an atomic bond to this Molecule's list of atomic bonds.
     *
     * @param {AtomicBond} atomicBond - The atomic bond to be added.
     **/
    addAtomicBond: function( atomicBond ) {
      this.atomicBonds.push( atomicBond );
    },

    /**
     * Emit the specified photon in a random direction.
     *
     * TODO: Requires the Photon.js dependency file.
     * TODO: Requires the notifyPhotonEmitted function.
     *
     * @param {Photon} photonToEmit - The photon to be emitted.
     **/
    emitPhoton: function( photonToEmit ) {
      var emissionAngle = RAND.nextDouble() * Math.PI * 2;
      photonToEmit.setVelocity( PHOTON_EMISSION_SPEED * Math.cos( emissionAngle ),
        ( PHOTON_EMISSION_SPEED * Math.sin( emissionAngle ) ) );
      var centerOfGravityPosRef = this.getCenterOfGravityPosRef();
      photonToEmit.setLocation( centerOfGravityPosRef.x, centerOfGravityPosRef.y );
      this.emittedPhotonProperty.set( photonToEmit );
      this.absorbtionHysteresisCountdownTime = ABSORPTION_HYSTERESIS_TIME;
      this.notifyPhotonEmitted( photonToEmit, this.photonAbsorptionModel );
    },

    /**
     * Cause the atom to emit a photon of the specified wavelength.
     *
     * @param {Number} wavelength
     **/
    emitNewPhoton: function( wavelength ) {
      this.emitPhoton( new Photon( wavelength ) );
    },

    /**
     * Update the positions of all atoms that comprise this molecule based on
     * the current center of gravity and the offset for each atom.
     **/
    updateAtomPositions: function() {
      for ( var uniqueID in this.initialAtomCogOffsets ) {
        if ( this.initialAtomCogOffsets.hasOwnProperty( uniqueID ) ) {
          var atomOffset = new Vector2( this.initialAtomCogOffsets[uniqueID].x, this.initialAtomCogOffsets[uniqueID].y );
          // Add the vibration, if any exists.
          atomOffset.add( this.vibrationAtomOffsets[uniqueID] );
          // Rotate.
          atomOffset.rotate( this.currentRotationRadians );
          // Set location based on combination of offset and current center
          // of gravity.
          this.atomsByID[uniqueID].positionProperty.set( new Vector2( this.centerOfGravity.x + atomOffset.x, this.centerOfGravity.y + atomOffset.y) );
        }
      }
    },

    /**
     * Set the velocity of this molecule from vector components.
     *
     * @param {Number} vx - The x component of the velocity vector.
     * @param {Number} vy - The y component of the velocity vector.
     **/
    setVelocity: function( vx, vy ) {
      this.setVelocityVec( new Vector2( vx, vy ) );
    },

    /**
     * Set the velocity of this molecule from a velocity vector.
     *
     * @param {Vector2} newVelocity - The velocity vector representing this molecules velocity.
     **/
    setVelocityVec: function( newVelocity ) {
      this.velocity.set( newVelocity );
    },

    /**
     * Get a the velocity vector of this molecule.
     *
     * @return {Vector2} velocity - The velocity vector of this molecule.
     */
    getVelocity: function() {
      return this.velocity;
    },

    /**
     * Notify the event listener that the Electron Energy State has changed.
     *
     * TODO: Requires the elctronicEnergyStateChanged method from the listener subclass.
     */
    notifyElectronicEnergyStateChanged: function() {
      for ( var listener in this.listeners ) {
        console.log( this.listeners[listener] );
        //listener.electronicEnergyStateChanged( this );
      }
    },

    /**
     * Notify the event listener that the center of gravity for this molecules has changed.
     *
     * TODO: Requires centerOfGravityPosChanged() method from the Listener subclass.
     */
    notifyCenterOfGravityPosChanged: function() {
      for ( var listener in this.listeners ) {
        this.listeners[listener].centerOfGravityPosChanged( this );
      }
    },

    /**
     * Notify the event listener that a photon has been emitted from this molecule.
     *
     * @param {Photon} photon - The emitted photon
     * @param {PhotonAbsorptionModel} model - The model which gets the notification.
     * TODO: Requires the photonEmitted() method from the Listener subclass.
     */
    notifyPhotonEmitted: function( photon, model ) {
      model.photons.add( photon );
    },

    /**
     * Notify the event listener that this molecule has broken apart.
     *
     * TODO: Requires the brokApart method from the Listener subclass.
     */
    notifyBrokeApart: function() {
      for ( var listener in this.listeners ) {
        this.listeners[listener].brokeApart( this );
      }
    },

    /**
     * Initialize the offsets from the center of gravity for each atom within
     * this molecule.  This should be in the "relaxed" (i.e. non-vibrating)
     * state.
     */
    initializeAtomOffsets: function() {
      throw new Error( 'initializeAtomOffsets should be implemented in descendant molecules.' );
    },

    getBreakApartConstituents: function() {
      return this.constituentMolecules;
    },

    /**
     * Get the instantaneous position destination of this molecule as a vector.
     * TODO: getDestination was originally a more generalized function in Abstract2D.java.  Perhaps this should be moved to Vector2.js?
     * @param { Vector2 } startPt - The initial position of the object.
     * @return { Vector2 } - The instantaneous destination of this object as a vector.
     */
    getDestination: function( startPt ) {
      return startPt.plus( this.velocity );
    }

  }, {
    // Static Methods

    /** Safely Create a new Molecule.
     * Catches Instantiation Exceptions and Illegal Access Exceptions.
     * (These exceptions are specific to the java newInstance() method, so new exceptions will be created.)
     * @return {Molecule} newMolecule
     *
     * TODO: The original .java version used some explicit java methods.  Not sure how to go about this one.
     * ---
     * Temporary Notes and Questions:
     * Declaration uses the ( Class<? extends Molecule> moleculeClass) syntax.  Will placing in static inherit
     * to Object be an equivalent to this? Or should I call ._extend?  Or extend.js in phet-core/js/extend.js?
     * Do we even need to check the validity of a new instance of Molecule?  We can easily call new Molecule().
     * ---
     **/
//    public static Molecule createMolecule( Class<? extends Molecule> moleculeClass ) {
//    Molecule newMolecule = null;
//    try {
//      newMolecule = moleculeClass.newInstance();
//    }
//    catch ( InstantiationException e ) {
//      e.printStackTrace();
//    }
//  catch ( IllegalAccessException e ) {
//      e.printStackTrace();
//    }
//    return newMolecule;
//  }

  } );
} )
;

//  //------------------------------------------------------------------------
//  // Methods
//  //------------------------------------------------------------------------
//
//  /**
//   * Get an enclosing rectangle for this molecule.  This was created to
//   * support searching for open locations for new molecules.
//   *
//   * @return
//   */
//  public Rectangle2D getBoundingRect() {
//    Rectangle2D[] atomRects = new Rectangle2D[atoms.size()];
//    for ( int i = 0; i < atoms.size(); i++ ) {
//      atomRects[i] = atoms.get( i ).getBoundingRect();
//    }
//
//    return RectangleUtils.union( atomRects );
//  }
//
//  //------------------------------------------------------------------------
//  // Inner Classes and Interfaces
//  //------------------------------------------------------------------------
//  public interface Listener {
//    void photonEmitted( Photon photon );
//
//    void brokeApart( Molecule molecule );
//
//    void electronicEnergyStateChanged( Molecule molecule );
//
//    void centerOfGravityPosChanged( Molecule molecule );
//  }
//
//  public static class Adapter implements Listener {
//    public void photonEmitted( Photon photon ) {
//    }
//
//    public void brokeApart( Molecule molecule ) {
//    }
//
//    public void electronicEnergyStateChanged( Molecule molecule ) {
//    }
//
//    public void centerOfGravityPosChanged( Molecule molecule ) {
//    }
//  }
//}

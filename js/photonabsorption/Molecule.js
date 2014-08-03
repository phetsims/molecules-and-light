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


  function Molecule() {
    // Atoms and bonds that comprise this molecule.
    this.atoms = []; // Elements are of type Atoms
    this.atomicBonds = []; // Elements are of type AtomicBonds

    // This is basically the location of the molecule, but it is specified as
    // the center of gravity since a molecule is a composite object.
    this.centerOfGravity = new Vector2();

    // Structure of the molecule in terms of offsets from the center of
    // gravity.  These indicate the atom's position in the "relaxed" (i.e.
    // non-vibrating), non-rotated state.
    // TODO: Declaration in original java is an empty hashmap, see if an arbitrary object is correct solution.
    this.initialAtomCogOffsets = {}; // Object contains keys of type atoms and values of type Vector2

    // Vibration offsets - these represent the amount of deviation from the
    // initial (a.k.a relaxed) configuration for each molecule.
    // TODO: Declaration in original java is an empty hashmap, see if an arbitrary object is correct solution.
    this.vibrationAtomOffsets = {}; // Object contains keys of type atoms and values of type Vector2

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
    //this.activePhotonAbsorptionStrategy = new PhotonAbsorptionStrategy.NullPhotonAbsorptionStrategy( this );

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

    // Tracks if molecule is higher energy than its ground state.
    this.highElectronicEnergyState = false;

    // Boolean values that track whether the molecule is vibrating or
    // rotating.
    this.vibrating = false;
    this.rotating = false;
    this.rotationDirectionClockwise = true; // Controls the direction of rotation.

    // List of constituent molecules. This comes into play only when the
    // molecule breaks apart, which many of the molecules never do.
    this.constituentMolecules = []; // Elements of type Molecule

  }

  return inherit( Object, Molecule, {

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

    step: function() {
      // Handle model animation here.
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
     * @param {Atom} atom
     * @param {Vector2} offset - Initial COG offset for when atom is not vibrating or rotating.
     */
    addInitialAtomCogOffset: function( atom, offset ) {
      // Check that the specified atom is a part of this molecule.  While it
      // would probably work to add the offsets first and the atoms later,
      // that's not how the sim was designed, so this is some enforcement of
      // the "add the atoms first" policy.
      assert && assert( this.atoms.contains( atom ) );
      this.initialAtomCogOffsets[ atom ] = offset;
    },


    /**
     * Get the initial offset from the molecule's center of gravity (COG) for
     * the specified molecule.
     *
     * @param {Atom} atom
     * @return {Vector2}
     **/
    getInitialAtomCogOffset: function( atom ) {
      if ( !(atom in this.initialAtomCogOffsets) ) {
        console.log( " - Warning: Attempt to get initial COG offset for atom that is not in molecule." );
      }
      return this.initialAtomCogOffsets[atom];
    },

    /**
     * Get the current vibration offset from the molecule's center of gravity
     * (COG) for the specified molecule.
     *
     * @param {Atom} atom
     * @return {Vector2} - Vector representing location of vibration offset from molecule's center of gravity.
     */
    getVibrationAtomOffset: function( atom ) {
      if ( !(atom in this.vibrationAtomOffsets) ) {
        console.log( " - Warning: Attempt to get vibrational COG offset for atom that is not in molecule." );
      }
      return this.vibrationAtomOffsets[atom];
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
    stepInTime: function( dt ) {
      activePhotonAbsorptionStrategy.stepInTime( dt );

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
      setCenterOfGravityPos( velocity.getDestination( centerOfGravity ) );
      setCenterOfGravityPos( centerOfGravity.getX() + velocity.getX() * dt, centerOfGravity.getY() + velocity.getY() * dt );
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
      if ( this.listeners.indexOf( listener ) == -1 ) {
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
     *
     * TODO: Requires the updateAtomPositions() and notifyCenterOfGravityPosChanged() functions.
     **/
    setCenterOfGravityPos: function( x, y ) {
      if ( this.centerOfGravity.x != x || this.centerOfGravity.y != y ) {
        this.centerOfGravity.setXY( x, y );
        //updateAtomPositions();
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
     * is in its vibration
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
     * TODO: Requires the updateAtomPositions() function.
     *
     * @param {radians}
     **/

    setRotation: function( radians ) {
      if ( radians != this.currentRotationRadians ) {
        this.currentRotationRadians = radians;
        //updateAtomPositions();
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
     * TODO: Requires the notifyElectronicEnergyStateChanged() function.
     *
     * @param {Boolean} highElectronicEnergyState
     **/
    setHighElectronicEnergyState: function( highElectronicEnergyState ) {
      this.highElectronicEnergyState = highElectronicEnergyState;
      //notifyElectronicEnergyStateChanged();
    },

    /**
     * Determine if the Molecule is in a high energy state.
     *
     * @return {Boolean} highElectronEnergyState
     **/
    isHighElectronicEnergyState: function() {
      return this.highElectronicEnergyState;
    },


    /**
     * Cause the molecule to dissociate, i.e. to break apart.
     **/
    breakApart: function() {
      console.log( " Error: breakApart invoked on a molecule for which the action is not implemented." );
      assert && assert( false );
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
//
//  /**
//   * Initialize the offsets from the center of gravity for each atom within
//   * this molecule.  This should be in the "relaxed" (i.e. non-vibrating)
//   * state.
//   */
//  protected abstract void initializeAtomOffsets();
//
//
//
//  private void notifyElectronicEnergyStateChanged() {
//    for ( Listener listener : listeners ) {
//      listener.electronicEnergyStateChanged( this );
//    }
//  }
//
//  private void notifyCenterOfGravityPosChanged() {
//    for ( Listener listener : listeners ) {
//      listener.centerOfGravityPosChanged( this );
//    }
//  }
//
//  protected void markPhotonForPassThrough( Photon photon ) {
//    if ( passThroughPhotonList.size() >= PASS_THROUGH_PHOTON_LIST_SIZE ) {
//      // Make room for this photon be deleting the oldest one.
//      passThroughPhotonList.remove( 0 );
//    }
//    passThroughPhotonList.add( photon );
//  }
//
//  protected boolean isPhotonMarkedForPassThrough( Photon photon ) {
//    return ( passThroughPhotonList.contains( photon ) );
//  }
//
//  public ArrayList<Atom> getAtoms() {
//    return new ArrayList<Atom>( atoms );
//  }
//
//  public ArrayList<AtomicBond> getAtomicBonds() {
//    return new ArrayList<AtomicBond>( atomicBonds );
//  }
//
//  /**
//   * Decide whether or not to absorb the offered photon.  If the photon is
//   * absorbed, the matching absorption strategy is set so that it can
//   * control the molecule's post-absorption behavior.
//   *
//   * @param photon - The photon offered for absorption.
//   * @return
//   */
//  public boolean queryAbsorbPhoton( Photon photon ) {
//
//    boolean absorbPhoton = false;
//
//    if ( !isPhotonAbsorbed() &&
//         absorbtionHysteresisCountdownTime <= 0 &&
//         photon.getLocation().distance( getCenterOfGravityPos() ) < PHOTON_ABSORPTION_DISTANCE
//      && !isPhotonMarkedForPassThrough( photon )
//      ) {
//
//      // The circumstances for absorption are correct, but do we have an
//      // absorption strategy for this photon's wavelength?
//      PhotonAbsorptionStrategy candidateAbsorptionStrategy = mapWavelengthToAbsorptionStrategy.get( photon.getWavelength() );
//      if ( candidateAbsorptionStrategy != null ) {
//        // Yes, there is a strategy available for this wavelength.
//        // Ask it if it wants the photon.
//        if ( candidateAbsorptionStrategy.queryAndAbsorbPhoton( photon ) ) {
//          // It does want it, so consider the photon absorbed.
//          absorbPhoton = true;
//          activePhotonAbsorptionStrategy = candidateAbsorptionStrategy;
//          activePhotonAbsorptionStrategy.queryAndAbsorbPhoton( photon );
//        }
//        else {
//          markPhotonForPassThrough( photon );//we have the decision logic once for whether a photon should be absorbed, so it is not queried a second time
//        }
//      }
//    }
//
//    return absorbPhoton;
//  }
//
//  public void setActiveStrategy( PhotonAbsorptionStrategy activeStrategy ) {
//    this.activePhotonAbsorptionStrategy = activeStrategy;
//  }
//
//  protected void addAtom( Atom atom ) {
//    atoms.add( atom );
//    initialAtomCogOffsets.put( atom, new MutableVector2D( 0, 0 ) );
//    vibrationAtomOffsets.put( atom, new MutableVector2D( 0, 0 ) );
//  }
//
//  protected void addAtomicBond( AtomicBond atomicBond ) {
//    atomicBonds.add( atomicBond );
//  }
//
//  /**
//   * Cause the atom to emit a photon of the specified wavelength.
//   *
//   * @param wavelength
//   */
//  public void emitPhoton( double wavelength ) {
//    emitPhoton( new Photon( wavelength ) );
//  }
//
//  /**
//   * Emit the specified photon in a random direction.
//   *
//   * @param photonToEmit
//   */
//  protected void emitPhoton( Photon photonToEmit ) {
//    double emissionAngle = RAND.nextDouble() * Math.PI * 2;
//    photonToEmit.setVelocity( (float) ( PHOTON_EMISSION_SPEED * Math.cos( emissionAngle ) ),
//      (float) ( PHOTON_EMISSION_SPEED * Math.sin( emissionAngle ) ) );
//    final Point2D centerOfGravityPosRef = getCenterOfGravityPosRef();
//    photonToEmit.setLocation( centerOfGravityPosRef.getX(), centerOfGravityPosRef.getY() );
//    notifyPhotonEmitted( photonToEmit );
//    absorbtionHysteresisCountdownTime = ABSORPTION_HYSTERESIS_TIME;
//  }
//
//  private void notifyPhotonEmitted( Photon photon ) {
//    for ( Listener listener : listeners ) {
//      listener.photonEmitted( photon );
//    }
//  }
//
//  protected void notifyBrokeApart() {
//    for ( Listener listener : new ArrayList<Listener>( listeners ) ) {
//      listener.brokeApart( this );
//    }
//  }
//
//  /**
//   * Update the positions of all atoms that comprise this molecule based on
//   * the current center of gravity and the offset for each atom.
//   */
//  protected void updateAtomPositions() {
//    for ( Atom atom : initialAtomCogOffsets.keySet() ) {
//      MutableVector2D atomOffset = new MutableVector2D( initialAtomCogOffsets.get( atom ) );
//      // Add the vibration, if any exists.
//      atomOffset.add( vibrationAtomOffsets.get( atom ) );
//      // Rotate.
//      atomOffset.rotate( currentRotationRadians );
//      // Set location based on combination of offset and current center
//      // of gravity.
//      atom.setPosition( centerOfGravity.getX() + atomOffset.getX(), centerOfGravity.getY() + atomOffset.getY() );
//    }
//  }
//
//  public void setVelocity( double vx, double vy ) {
//    setVelocity( new Vector2D( vx, vy ) );
//  }
//
//  public void setVelocity( Vector2D newVelocity ) {
//    this.velocity.setValue( newVelocity );
//  }
//
//  public AbstractVector2D getVelocity() {
//    return velocity;
//  }
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
//
//  public ArrayList<Molecule> getBreakApartConstituents() {
//    return constituentMolecules;
//  }
//
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

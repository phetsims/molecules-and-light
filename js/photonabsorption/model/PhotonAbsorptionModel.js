//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for Molecules and Light.  It is called PhotonAbsorptionModel because it came from the original Java version
 * in a file called PhotonAbsorptionModel.java, which is used by both "Molecules & Light" and "Greenhouse Gas"
 *
 * This models photons being absorbed (or often NOT absorbed) by various molecules.  The scale for this
 * model is picometers (10E-12 meters).
 * <p/>
 * The basic idea for this model is that there is some sort of photon emitter
 * that emits photons, and some sort of photon target that could potentially
 * some of the emitted photons and react in some way.  In many cases, the
 * photon target can re-emit one or more photons after absorption.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );
  var Rectangle = require( 'DOT/Rectangle' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var WavelengthConstants = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/WavelengthConstants' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionStrategy' );
  var PhotonHoldStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonHoldStrategy' );
  var VibrationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/VibrationStrategy' );
  var RotationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/RotationStrategy' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Photon' );
  var ExcitationStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/ExcitationStrategy' );
  var Atom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/Atom' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var CarbonAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/CarbonAtom' );
  var HydrogenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/HydrogenAtom' );
  var CO = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/CO' );
  var N2 = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/molecules/N2' );

  //----------------------------------------------------------------------------
  // Class Data
  //----------------------------------------------------------------------------
  // Constants that controls where and how photons are emitted.
  var PHOTON_EMISSION_LOCATION = new Vector2( -1400, 0 );
  var PHOTON_EMISSION_ANGLE_RANGE = Math.PI / 2;

  // Location used when a single molecule is sitting in the area where the
  // photons pass through.
  var SINGLE_MOLECULE_LOCATION = new Vector2( 0, 0 );

  // Velocity of emitted photons.  Since they are emitted horizontally, only
  // one value is needed.
  var PHOTON_VELOCITY = 2.0;

  // Distance for a photon to travel before being removed from the model.
  // This value is essentially arbitrary, and needs to be set such that the
  // photons only disappear after they have traveled beyond the bounds of
  // the play area.
  var MAX_PHOTON_DISTANCE = 4500;

  // Constants that define the size of the containment area, which is the
  // rectangle that surrounds the molecule(s).
  var CONTAINMENT_AREA_WIDTH = 3100;   // In picometers.
  var CONTAINMENT_AREA_HEIGHT = 3000;  // In picometers.
  var CONTAINMENT_AREA_CENTER = new Vector2( 0, 0 );
  var CONTAINMENT_AREA_RECT = new Rectangle(
      CONTAINMENT_AREA_CENTER.x - CONTAINMENT_AREA_WIDTH / 2,
      CONTAINMENT_AREA_CENTER.y - CONTAINMENT_AREA_HEIGHT / 2,
    CONTAINMENT_AREA_WIDTH,
    CONTAINMENT_AREA_HEIGHT
  );

  // Choices of targets for the photons.
  // We may not technically need these strings to be enumerated here and accessed in an array, but it
  // serves as a good point to document what all the possible types are.
  var photonTargets = ['SINGLE_CO_MOLECULE', 'SINGLE_CO2_MOLECULE', 'SINGLE_H2O_MOLECULE', 'SINGLE_CH4_MOLECULE',
    'SINGLE_N2O_MOLECULE', 'SINGLE_N2_MOLECULE', 'SINGLE_NO2_MOLECULE', 'SINGLE_O2_MOLECULE', 'SINGLE_O3_MOLECULE',
    'CONFIGURABLE_ATMOSPHERE'];

  // Minimum and defaults for photon emission periods.  Note that the max is
  // assumed to be infinity.
  var MIN_PHOTON_EMISSION_PERIOD_SINGLE_TARGET = 400;
  var DEFAULT_PHOTON_EMISSION_PERIOD = 3000; // Milliseconds of sim time.
  var MIN_PHOTON_EMISSION_PERIOD_MULTIPLE_TARGET = 100;

  // Default values for various parameters that weren't already covered.
  var DEFAULT_PHOTON_TARGET = 'SINGLE_CH4_MOLECULE';
  var DEFAULT_EMITTED_PHOTON_WAVELENGTH = WavelengthConstants.IR_WAVELENGTH;
  var INITIAL_COUNTDOWN_WHEN_EMISSION_ENABLED = 300;

  var MAX_ATMOSPHERE_CONCENTRATIONS = {
    'N2': 15,
    'O2': 15,
    'CO2': 15,
    'CH4': 15,
    'H2O': 15
  };

  //Random number generator.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    }
  };

  // Create a grid-based set of possible locations for molecules in the
  // configurable atmosphere.
  // The type of element in the array is Vector2
  var GRID_POINTS = [];

  var numGridlinesX = 8;
  var gridLineSpacingX = CONTAINMENT_AREA_WIDTH / ( numGridlinesX + 1 );
  var numGridlinesY = 8;
  var gridLineSpacingY = CONTAINMENT_AREA_WIDTH / ( numGridlinesY + 1 );
  for ( var i = 1; i <= numGridlinesX; i++ ) {
    for ( var j = 1; j <= numGridlinesY; j++ ) {
      GRID_POINTS.push( new Vector2(
          i * gridLineSpacingX + CONTAINMENT_AREA_RECT.getMinX(),
          j * gridLineSpacingY + CONTAINMENT_AREA_RECT.getMinY() ) );
    }
  }

  function PhotonAbsorptionModel() {

    PropertySet.call( this, {
      emissionFrequency: 0,
      photonWavelength: WavelengthConstants.IR_WAVELENGTH } );

    // TODO: We need to build something that behaves sufficiently like EventListenerList
    this.listeners = [];
    this.photons = new ObservableArray(); //Elements are of type Photon
    //this.photonWavelength = WavelengthConstants.VISIBLE_WAVELENGTH;
    this.activeMolecules = []; // Elements are of type Molecule
    this.initialPhotonTarget = null;

    // The photon target is the thing that the photons are shot at, and based
    // on its particular nature, it may or may not absorb some of the photons.
    this.photonTarget = null;

    // Variables that control periodic photon emission.
    this.photonEmissionCountdownTimer = Number.POSITIVE_INFINITY;
    this.photonEmissionPeriodTarget = DEFAULT_PHOTON_EMISSION_PERIOD;
    this.previousEmissionAngle = 0;

    // Collection that contains the molecules that comprise the configurable
    // atmosphere.
    this.configurableAtmosphereMolecules = []; // Elements are of type Molecule

  }

  return inherit( PropertySet, PhotonAbsorptionModel, {


    /**
     * Reset the model to its initial state.
     */
    reset: function() {

      // Remove any photons that are currently in transit.
      this.removeAllPhotons();

      // Reset all molecules, which will stop any vibrations.
      for ( var molecule in this.activeMolecules ) {
        this.activeMolecules[molecule].reset();
      }

      // Set default values.
      this.setPhotonTarget( this.initialPhotonTarget );
      this.setEmittedPhotonWavelength( DEFAULT_EMITTED_PHOTON_WAVELENGTH );
      this.setPhotonEmissionPeriod( DEFAULT_PHOTON_EMISSION_PERIOD );

      // Reset the configurable atmosphere.
      this.resetConfitgurableAtmosphere();

      // Send out notification that the reset has occurred.
      this.notifyModelReset();
    },

    /**
     * Advance the molecules one step in time.  Called by the animation loop.
     *
     * @param {Number} dt - The incremental time step.
     */
    step: function( dt ) {
      dt *= 1000;
      // Check if it is time to emit any photons.
      if ( this.photonEmissionCountdownTimer !== Number.POSITIVE_INFINITY ) {
        this.photonEmissionCountdownTimer -= dt;
        if ( this.photonEmissionCountdownTimer <= 0 ) {
          // Time to emit.
          this.emitPhoton();
          this.photonEmissionCountdownTimer = this.photonEmissionPeriodTarget;
        }
      }

      // Step the photons, marking any that have moved beyond the model
      // bounds for removal.
      var photonsToRemove = [];
      for ( var photon = 0; photon < this.photons.length; photon++ ) {
        this.photons.get( photon ).stepInTime( dt );
        if ( this.photons.get( photon ).getLocation().x - PHOTON_EMISSION_LOCATION.x <= MAX_PHOTON_DISTANCE ) {
          // See if any of the molecules wish to absorb this photon.
          for ( var molecule = 0; molecule < this.activeMolecules.length; molecule++ ) {
            if ( this.activeMolecules[molecule].queryAbsorbPhoton( this.photons.get( photon ) ) ) {
              photonsToRemove.push( this.photons.get( photon ) );
            }
          }
        }
        else {
          // The photon has moved beyond our simulation bounds, so remove it from the model.
          photonsToRemove.push( photon );
        }
      }
      this.photons.removeAll( photonsToRemove );
      // Remove any photons that were marked for removal.

      // Step the molecules.
      // TODO: The original java code created a new array for this for loop.  The ported version is messy, is this necessary?
      var moleculesToStep = new Array( this.activeMolecules );
      for ( molecule = 0; molecule < moleculesToStep; molecule++ ) {
        moleculesToStep[molecule].stepInTime( dt );
      }
    },

    /**
     * Cause a photon to be emitted from the emission point.  Emitted photons
     * will travel toward the photon target, which will decide whether a given
     * photon should be absorbed.
     *
     */
    emitPhoton: function() {
      var photon = new Photon( this.photonWavelength );
      photon.setLocation( PHOTON_EMISSION_LOCATION.x, PHOTON_EMISSION_LOCATION.y );
      var emissionAngle = 0; // Straight to the right.
      if ( this.photonTarget == 'CONFIGURABLE_ATMOSPHERE' ) {
        // Photons can be emitted at an angle.  In order to get a more
        // even spread, we alternate emitting with an up or down angle.
        emissionAngle = RAND.nextDouble() * PHOTON_EMISSION_ANGLE_RANGE / 2;
        if ( this.previousEmissionAngle > 0 ) {
          emissionAngle = -emissionAngle;
        }
        this.previousEmissionAngle = emissionAngle;
      }
      photon.setVelocity( PHOTON_VELOCITY * Math.cos( emissionAngle ),
          PHOTON_VELOCITY * Math.sin( emissionAngle ) );
      this.photons.add( photon );
    },


    setEmittedPhotonWavelength: function( freq ) {
      if ( this.photonWavelength != freq ) {
        // Set the new value and send out notification of change to listeners.
        this.photonWavelength = freq;
        //notifyEmittedPhotonWavelengthChanged();
      }
    },

    getEmittedPhotonWavelength: function() {
      return this.photonWavelength;
    },


    getPhotonEmissionLocation: function() {
      return PHOTON_EMISSION_LOCATION;
    },
    /**
     * Set the emission period, i.e. the time between photons.
     *
     * @param {Number} photonEmissionPeriod - Period between photons in milliseconds.
     */
    setPhotonEmissionPeriod: function( photonEmissionPeriod ) {
      assert && assert( photonEmissionPeriod >= 0 );
      if ( this.photonEmissionPeriodTarget != photonEmissionPeriod ) {
        // If we are transitioning from off to on, set the countdown timer
        // such that a photon will be emitted right away so that the user
        // doesn't have to wait too long in order to see something come
        // out.
        if ( this.photonEmissionPeriodTarget === Number.POSITIVE_INFINITY && photonEmissionPeriod != Number.POSITIVE_INFINITY ) {
          this.photonEmissionCountdownTimer = INITIAL_COUNTDOWN_WHEN_EMISSION_ENABLED;
        }
        // Handle the case where the new value is smaller than the current countdown value.
        else if ( photonEmissionPeriod < this.photonEmissionCountdownTimer ) {
          this.photonEmissionCountdownTimer = photonEmissionPeriod;
        }
        // If the new value is infinity, it means that emissions are being
        // turned off, so set the period to infinity right away.
        else if ( photonEmissionPeriod == Number.POSITIVE_INFINITY ) {
          this.photonEmissionCountdownTimer = photonEmissionPeriod; // Turn off emissions.
        }
        this.photonEmissionPeriodTarget = photonEmissionPeriod;
      }
    },

    getPhotonTarget: function() {
      return this.photonTarget;
    },


    /**
     * @return {Number} - Period between photons in milliseconds.
     */
    getPhotonEmissionPeriod: function() {
      return this.photonEmissionPeriodTarget;
    }




  } );
} );

//
//  // Object that listens to molecules to see when they emit photons.
//  private final Molecule.Adapter moleculePhotonEmissionListener = new Molecule.Adapter() {
//    @Override
//    public void photonEmitted( Photon photon ) {
//      photons.add( photon );
//      notifyPhotonAdded( photon );
//    }
//
//    @Override
//    public void brokeApart( Molecule molecule ) {
//
//      // The molecule broke apart, so we need to remove the current molecule...
//      removeOldTarget();
//
//      // ...and then get the constituents and add them to the model.
//      ArrayList<Molecule> constituents = molecule.getBreakApartConstituents();
//      for ( Molecule constituent : constituents ) {
//        activeMolecules.add( constituent );
//      }
//
//      finishAddingMolecules();
//    }
//  };
//
//  private void finishAddingMolecules() {
//    // Send out notifications about the new molecule(s);
//    for ( Molecule molecule : activeMolecules ) {
//      molecule.addListener( moleculePhotonEmissionListener );
//      notifyMoleculeAdded( molecule );
//    }
//
//    // Send out general notification about the change.
//    notifyPhotonTargetChanged();
//  }
//
//  private void removeOldTarget() {
//    ArrayList<Molecule> copyOfMolecules = new ArrayList<Molecule>( activeMolecules );
//    activeMolecules.clear();
//    for ( Molecule molecule : copyOfMolecules ) {
//      notifyMoleculeRemoved( molecule );
//    }
//  }
//
//  //----------------------------------------------------------------------------
//  // Constructor(s)
//  //----------------------------------------------------------------------------
//
//  public PhotonAbsorptionModel( ConstantDtClock clock ) {
//    this( clock, DEFAULT_PHOTON_TARGET );
//  }
//
//  public PhotonAbsorptionModel( ConstantDtClock clock, PhotonTarget initialPhotonTarget ) {
//
//    this.initialPhotonTarget = initialPhotonTarget;
//
//    // Listen to the clock in order to step this model.
//    clock.addClockListener( new ClockAdapter() {
//      @Override
//      public void clockTicked( ClockEvent clockEvent ) {
//        stepInTime( clockEvent.getSimulationTimeChange() );
//      }
//    } );
//
//    // Note: It is expected that this model will be reset as part of the
//    // initialization sequence, so additional initialization is performed
//    // there.
//  }
//
//  //----------------------------------------------------------------------------
//  // Methods
//  //----------------------------------------------------------------------------
//
//  public void setPhotonTarget( PhotonTarget photonTarget ) {
//    if ( this.photonTarget != photonTarget ) {
//
//      // If switching to the configurable atmosphere, photon emission
//      // is turned off (if it is happening).  This is done because it
//      // just looks better.
//      if ( photonTarget == PhotonTarget.CONFIGURABLE_ATMOSPHERE || this.photonTarget == PhotonTarget.CONFIGURABLE_ATMOSPHERE ) {
//        setPhotonEmissionPeriod( Double.POSITIVE_INFINITY );
//        removeAllPhotons();
//      }
//
//      // Update to the new value.
//      this.photonTarget = photonTarget;
//
//      // Remove the old photon target(s).
//      removeOldTarget();
//
//      // Add the new photon target(s).
//      Molecule newMolecule;
//      switch( photonTarget ) {
//        case SINGLE_CO_MOLECULE:
//          newMolecule = new CO( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_CO2_MOLECULE:
//          newMolecule = new CO2( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_H2O_MOLECULE:
//          newMolecule = new H2O( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_CH4_MOLECULE:
//          newMolecule = new CH4( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_N2_MOLECULE:
//          newMolecule = new N2( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_O2_MOLECULE:
//          newMolecule = new O2( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_O3_MOLECULE:
//          newMolecule = new O3( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case SINGLE_NO2_MOLECULE:
//          newMolecule = new NO2( SINGLE_MOLECULE_LOCATION );
//          activeMolecules.add( newMolecule );
//          break;
//        case CONFIGURABLE_ATMOSPHERE:
//          // Add references for all the molecules in the configurable
//          // atmosphere to the "active molecules" list.
//          activeMolecules.addAll( configurableAtmosphereMolecules );
//          break;
//        default:
//          System.err.println( getClass().getName() + " - Error: Unhandled photon target." );
//          break;
//      }
//
//      // Send out notifications about the new molecule(s);
//      finishAddingMolecules();
//    }
//  }
//
//  /**
//   * This method restores the photon target to whatever it is currently set
//   * to.  This may seem nonsensical, and in some cases it is, but it is
//   * useful in cases where an atom has broken apart and needs to be restored
//   * to its original condition.
//   */
//  public void restorePhotonTarget() {
//    PhotonTarget currentTarget = photonTarget;
//    photonTarget = null; // This forces the call to setPhotonTarget to pay attention to the renewal.
//    setPhotonTarget( currentTarget );
//  }
//
//  private void removeAllPhotons() {
//    ArrayList<Photon> copyOfPhotons = new ArrayList<Photon>( photons );
//    photons.clear();
//    for ( Photon photon : copyOfPhotons ) {
//      photons.remove( photon );
//      notifyPhotonRemoved( photon );
//    }
//  }
//
//  public Rectangle2D getContainmentAreaRect() {
//    return CONTAINMENT_AREA_RECT;
//  }
//
//  public ArrayList<Molecule> getMolecules() {
//    return new ArrayList<Molecule>( activeMolecules );
//  }
//
//
//  /**
//   * Get the number of the specified molecule in the configurable atmosphere.
//   *
//   * @param moleculeClass
//   * @return
//   */
//  public int getConfigurableAtmosphereGasLevel( Class<? extends Molecule> moleculeClass ) {
//    int moleculeCount = 0;
//    for ( Molecule molecule : configurableAtmosphereMolecules ) {
//      if ( molecule.getClass() == moleculeClass ) {
//        moleculeCount++;
//      }
//    }
//    return moleculeCount;
//  }
//
//  /**
//   * Set the level of the specified gas in the configurable atmosphere.
//   *
//   * @param moleculeClass
//   * @param targetQuantity
//   */
//  public void setConfigurableAtmosphereGasLevel( Class<? extends Molecule> moleculeClass, int targetQuantity ) {
//    // Bounds checking.
//    assert targetQuantity >= 0;
//    if ( targetQuantity < 0 ) {
//      System.err.println( getClass().getName() + " - Error: Invalid target quantity for gas level." );
//      return;
//    }
//    else if ( targetQuantity > MAX_ATMOSPHERE_CONCENTRATIONS.get( moleculeClass ) ) {
//      System.err.println( getClass().getName() + " - Error: Target quantity of " + targetQuantity +
//                          "is out of range, limiting to " + MAX_ATMOSPHERE_CONCENTRATIONS.get( moleculeClass ) );
//      targetQuantity = MAX_ATMOSPHERE_CONCENTRATIONS.get( moleculeClass );
//    }
//
//    // Count the number of the specified type that currently exists.
//    int numMoleculesOfSpecifiedType = 0;
//    for ( Molecule molecule : configurableAtmosphereMolecules ) {
//      if ( molecule.getClass() == moleculeClass ) {
//        numMoleculesOfSpecifiedType++;
//      }
//    }
//
//    // Calculate the difference.
//    int numMoleculesToAdd = targetQuantity - numMoleculesOfSpecifiedType;
//
//    // Make the changes.
//    if ( numMoleculesToAdd > 0 ) {
//      // Add the necessary number of the specified molecule.
//      for ( int i = 0; i < numMoleculesToAdd; i++ ) {
//        Molecule moleculeToAdd = Molecule.createMolecule( moleculeClass );
//        moleculeToAdd.setCenterOfGravityPos( findLocationInAtmosphereForMolecule( moleculeToAdd ) );
//        configurableAtmosphereMolecules.add( moleculeToAdd );
//        moleculeToAdd.addListener( moleculePhotonEmissionListener );
//      }
//    }
//    else if ( numMoleculesToAdd < 0 ) {
//      // Remove the necessary number of the specified molecule.
//      ArrayList<Molecule> moleculesToRemove = new ArrayList<Molecule>();
//      for ( Molecule molecule : configurableAtmosphereMolecules ) {
//        if ( molecule.getClass() == moleculeClass ) {
//          moleculesToRemove.add( molecule );
//          if ( moleculesToRemove.size() >= Math.abs( numMoleculesToAdd ) ) {
//            break;
//          }
//        }
//      }
//      configurableAtmosphereMolecules.removeAll( moleculesToRemove );
//    }
//    else {
//      if ( targetQuantity != 0 ) {
//        System.err.println( getClass().getName() + " - Warning: Ignoring call to set molecule levels to current level." );
//      }
//    }
//
//    // Send notifications of the change.
//    if ( numMoleculesToAdd != 0 ) {
//      notifyConfigurableAtmospherCompositionChanged();
//    }
//
//    // If the configurable atmosphere is the currently selected target,
//    // then these changes must be synchronized with the active molecules.
//    if ( photonTarget == PhotonTarget.CONFIGURABLE_ATMOSPHERE ) {
//      syncConfigAtmosphereToActiveMolecules();
//    }
//  }
//
//  /**
//   * Get the number of the specified molecule in the configurable atmosphere.
//   *
//   * @param moleculeClass
//   * @return
//   */
//  public int getConfigurableAtmosphereMaxLevel( Class<? extends Molecule> moleculeClass ) {
//    if ( MAX_ATMOSPHERE_CONCENTRATIONS.containsKey( moleculeClass ) ) {
//      return MAX_ATMOSPHERE_CONCENTRATIONS.get( moleculeClass );
//    }
//    else {
//      return 0;
//    }
//  }
//
//  /**
//   * Set the active molecules to match the list of molecules in the
//   * configurable atmosphere list.  This is generally done when switching
//   * the photon target to be the atmosphere or when the concentration of the
//   * gases in the atmosphere changes while the configurable atmosphere is
//   * the selected photon target.
//   * <p/>
//   * The direction of data flow is from the config atmosphere to the active
//   * molecules, not the reverse.
//   * <p/>
//   * This routine takes care of sending out notifications of molecules
//   * coming and/or going.
//   */
//  public void syncConfigAtmosphereToActiveMolecules() {
//
//    for ( Molecule molecule : configurableAtmosphereMolecules ) {
//      if ( !activeMolecules.contains( molecule ) ) {
//        // This molecule is not on the active list, so it should be
//        // added to it.
//        activeMolecules.add( molecule );
//        notifyMoleculeAdded( molecule );
//      }
//    }
//
//    ArrayList<Molecule> moleculesToRemoveFromActiveList = new ArrayList<Molecule>();
//    for ( Molecule molecule : activeMolecules ) {
//      if ( !configurableAtmosphereMolecules.contains( molecule ) ) {
//        // This molecule is on the active list but NOT in the
//        // configurable atmosphere, so it should be removed.
//        moleculesToRemoveFromActiveList.add( molecule );
//      }
//    }
//    activeMolecules.removeAll( moleculesToRemoveFromActiveList );
//    for ( Molecule molecule : moleculesToRemoveFromActiveList ) {
//      notifyMoleculeRemoved( molecule );
//    }
//  }
//
//  public void addListener( Listener listener ) {
//    listeners.add( Listener.class, listener );
//  }
//
//  public void removeListener( Listener listener ) {
//    listeners.remove( Listener.class, listener );
//  }
//
//  // Constants used when trying to find an open location in the atmosphere.
//  private static final double MIN_DIST_FROM_WALL_X = 20; // In picometers.
//  private static final double MIN_DIST_FROM_WALL_Y = 20; // In picometers.
//  private static final double EMITTER_AVOIDANCE_COMP_X = 300;
//  private static final double EMITTER_AVOIDANCE_COMP_Y = 800;
//
//  /**
//   * Find a location in the atmosphere that has a minimal amount of overlap
//   * with other molecules.  This is assumed to be used only when multiple
//   * molecules are being shown.
//   * <p/>
//   * IMPORTANT: This assumes that the molecule in question is not already on
//   * the list of molecules, and may return weird results if it is.
//   *
//   * @return - A Point2D that is relatively free of other molecules.
//   */
//  private Point2D findLocationInAtmosphereForMolecule( Molecule molecule ) {
//
//    // Generate a set of random location.
//    ArrayList<Point2D> possibleLocations = new ArrayList<Point2D>();
//
//    double minDistWallToMolCenterX = MIN_DIST_FROM_WALL_X + molecule.getBoundingRect().getWidth() / 2;
//    double minXPos = CONTAINMENT_AREA_RECT.getMinX() + minDistWallToMolCenterX;
//    double xRange = CONTAINMENT_AREA_RECT.getWidth() - 2 * minDistWallToMolCenterX;
//    double minDistWallToMolCenterY = MIN_DIST_FROM_WALL_Y + molecule.getBoundingRect().getHeight() / 2;
//    double minYPos = CONTAINMENT_AREA_RECT.getMinY() + minDistWallToMolCenterY;
//    double yRange = CONTAINMENT_AREA_RECT.getHeight() - 2 * minDistWallToMolCenterY;
//
//    for ( int i = 0; i < 20; i++ ) {
//      // Randomly generate a position.
//      double proposedYPos = minYPos + RAND.nextDouble() * yRange;
//      double proposedXPos;
//      if ( Math.abs( proposedYPos - getContainmentAreaRect().getCenterY() ) < EMITTER_AVOIDANCE_COMP_Y / 2 ) {
//        // Compensate in the X direction so that this position is not
//        // too close to the photon emitter.
//        proposedXPos = minXPos + EMITTER_AVOIDANCE_COMP_X + RAND.nextDouble() * ( xRange - EMITTER_AVOIDANCE_COMP_X );
//      }
//      else {
//        proposedXPos = minXPos + RAND.nextDouble() * xRange;
//      }
//      possibleLocations.add( new Point2D.Double( proposedXPos, proposedYPos ) );
//    }
//
//    final double molRectWidth = molecule.getBoundingRect().getWidth();
//    final double molRectHeight = molecule.getBoundingRect().getHeight();
//
//    // Figure out which point would position the molecule such that it had
//    // the least overlap with other molecules.
//    Collections.sort( possibleLocations, new Comparator<Point2D>() {
//      public int compare( Point2D p1, Point2D p2 ) {
//        return Double.compare( getOverlapWithOtherMolecules( p1, molRectWidth, molRectHeight ),
//          getOverlapWithOtherMolecules( p2, molRectWidth, molRectHeight ) );
//      }
//    } );
//
//    Point2D pt = possibleLocations.get( 0 );
//    if ( pt.getX() + molRectWidth / 2 > CONTAINMENT_AREA_RECT.getMaxX() ) {
//      System.out.println( "Whoa! " + pt );
//    }
//
//    return possibleLocations.get( 0 );
//  }
//
//  /**
//   * Convenience method for creating a rectangle from a center point.
//   *
//   * @param pt
//   * @param width
//   * @param height
//   * @return
//   */
//  private Rectangle2D createRectangleFromPoint( Point2D pt, double width, double height ) {
//    return new Rectangle2D.Double( pt.getX() - width / 2, pt.getY() - height / 2, width, height );
//  }
//
//  private double getMinDistanceToOtherMolecules( Point2D o1 ) {
//    double minDistance = Double.POSITIVE_INFINITY;
//    for ( Molecule molecule : configurableAtmosphereMolecules ) {
//      if ( molecule.getCenterOfGravityPos().distance( o1 ) < minDistance ) {
//        minDistance = molecule.getCenterOfGravityPos().distance( o1 );
//      }
//    }
//    return minDistance;
//  }
//
//  private double getOverlapWithOtherMolecules( Point2D pt, double width, double height ) {
//    double overlap = 0;
//    Rectangle2D testRect = createRectangleFromPoint( pt, width, height );
//    for ( Molecule molecule : configurableAtmosphereMolecules ) {
//      // Add in the overlap for each molecule.  There may well be no
//      // overlap.
//      overlap += Math.max( molecule.getBoundingRect().createIntersection( testRect ).getWidth(), 0 ) *
//                 Math.max( molecule.getBoundingRect().createIntersection( testRect ).getHeight(), 0 );
//    }
//    if ( overlap == 0 ) {
//      // This point has no overlap.  Add some "bonus points" for the
//      // amount of distance from all other points.  The reason that this
//      // is negative is that 0 is the least overlap that can occur, so
//      // it is even better if it is a long way from any other molecules.
//      overlap = -getMinDistanceToOtherMolecules( pt );
//    }
//    return overlap;
//  }
//
//  /**
//   * Reset the configurable atmosphere by adding the initial levels of all
//   * gases.
//   */
//  private void resetConfigurableAtmosphere() {
//    assert photonTarget != PhotonTarget.CONFIGURABLE_ATMOSPHERE; // See method header comment if this assertion is hit.
//  }
//
//  private void notifyPhotonAdded( Photon photon ) {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.photonAdded( photon );
//    }
//  }
//
//  private void notifyPhotonRemoved( Photon photon ) {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.photonRemoved( photon );
//    }
//  }
//
//  private void notifyMoleculeAdded( Molecule molecule ) {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.moleculeAdded( molecule );
//    }
//  }
//
//  private void notifyMoleculeRemoved( Molecule molecule ) {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.moleculeRemoved( molecule );
//    }
//  }
//
//  private void notifyEmittedPhotonWavelengthChanged() {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.emittedPhotonWavelengthChanged();
//    }
//  }
//
//  private void notifyPhotonEmissionPeriodChanged() {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.photonEmissionPeriodChanged();
//    }
//  }
//
//  private void notifyPhotonTargetChanged() {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.photonTargetChanged();
//    }
//  }
//
//  private void notifyConfigurableAtmospherCompositionChanged() {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.configurableAtmosphereCompositionChanged();
//    }
//  }
//
//  private void notifyModelReset() {
//    for ( Listener listener : listeners.getListeners( Listener.class ) ) {
//      listener.modelReset();
//    }
//  }
//
//  //----------------------------------------------------------------------------
//  // Inner Classes and Interfaces
//  //----------------------------------------------------------------------------
//
//  public interface Listener extends EventListener {
//    void photonAdded( Photon photon );
//
//    void photonRemoved( Photon photon );
//
//    void moleculeAdded( Molecule molecule );
//
//    void moleculeRemoved( Molecule molecule );
//
//    void emittedPhotonWavelengthChanged();
//
//    void photonTargetChanged();
//
//    void photonEmissionPeriodChanged();
//
//    void configurableAtmosphereCompositionChanged();
//
//    /**
//     * Notification that the model was reset.  In general, this should
//     * ONLY be used to reset things in the view that do not have a direct
//     * representation in the model, such as the way some part of the view
//     * is configured.
//     */
//    void modelReset();
//  }
//
//  public static class Adapter implements Listener {
//    public void photonAdded( Photon photon ) {
//    }
//
//    public void emittedPhotonWavelengthChanged() {
//    }
//
//    public void photonRemoved( Photon photon ) {
//    }
//
//    public void photonTargetChanged() {
//    }
//
//    public void moleculeAdded( Molecule molecule ) {
//    }
//
//    public void moleculeRemoved( Molecule molecule ) {
//    }
//
//    public void configurableAtmosphereCompositionChanged() {
//    }
//
//    public void photonEmissionPeriodChanged() {
//    }
//
//    public void modelReset() {
//    }
//  }
//}

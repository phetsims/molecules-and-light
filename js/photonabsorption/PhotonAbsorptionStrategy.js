// Copyright 2002-2014, University of Colorado

/**
 * The original java file is PhotonAbsorptionStrategy.java.  This is common
 * code which will be used to define the photon absorption strategy for
 * molecules in simulations like "Greenhouse Gas" and "Molecules and Light"
 *
 * This is the base model for the strategies that define how a molecule
 * reacts to a given photon.  It is responsible for the following:
 * - Whether a given photon should be absorbed.
 * - How the molecule reacts to the absorption,, i.e. whether it vibrates,
 * rotates, breaks apart, etc.
 * - Maintenance of any counters or timers associated with the reaction to
 * the absorption, such as those related to re-emission of an absorbed
 * photon.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/Photon' );


  var MIN_PHOTON_HOLD_TIME = 600; // Milliseconds of sim time.
  var MAX_PHOTON_HOLD_TIME = 1200; // Milliseconds of sim time.

  //Random number generator.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    }
  };


  function PhotonAbsorptionStrategy( molecule ) {
    // Property that contains the probability that a given photon will be absorbed.
    this.photonAbsorptionProbability = 0.5;

    this.molecule = molecule;

    // Variables involved in the holding and re-emitting of photons.
    //this.absorbedPhoton = new Photon(); // TODO: Requires the Photon.js dependency file.
    this.inExcitedState = false;
    this.photonHoldCountdownTime = 0;
  }

  return inherit( Object, PhotonAbsorptionStrategy, {

    getMolecule: function() {
      return this.molecule;
    },

    /**
     * Reset the strategy.  In most cases, this will need to be overridden in the descendant classes, but those
     * overrides should also call this one.
     */
    reset: function() {
      //this.absorbedPhoton = null; TODO: Requires the Photon.js dependency file.
      this.inExcitedState = false;
      this.photonHoldCountdownTime = 0;
    },

    /**
     * Decide whether the provided photon should be absorbed.  By design,
     * a given photon should only be requested once, not multiple times.
     *
     * @param {Photon} photon
     * @return {Boolean} absorbed
     */
    queryAndAbsorbPhoton: function( photon ) {
      // All circumstances are correct for photon absorption, so now we decide probabilistically whether or not to
      // actually do it.  This essentially simulates the quantum nature of the absorption.
      var absorbed = !this.isPhotonAbsorbed && RAND.nextDouble() < this.photonAbsorptionProbability;
      if ( absorbed ) {
        this.inExcitedState = true;
        this.photonHoldCountdownTime = MIN_PHOTON_HOLD_TIME + RAND.nextDouble() * ( MAX_PHOTON_HOLD_TIME - MIN_PHOTON_HOLD_TIME );
      }
      return absorbed;
    },

    /**
     * Determine if a photon is currently absorbed.
     *
     * @return {Boolean} inExcitedState
     */
    isPhotonAbsorbed: function() {
      return this.inExcitedState;
    }

  }, {

  } )
} )
;

//
//  /**
//   * Step the strategy forward in time by the given time.
//   *
//   * @param dt
//   */
//  public abstract void stepInTime( double dt );
//
//
//  /**
//   * Photon absorption strategy that causes a molecule to hold a photon
//   * once is has absorbed it, then after some amount of time re-emit it.
//   * In the
//   */
//  public static abstract class PhotonHoldStrategy extends PhotonAbsorptionStrategy {
//
//    private double absorbedWavelength;
//
//    public PhotonHoldStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    public void stepInTime( double dt ) {
//      photonHoldCountdownTime -= dt;
//      if ( photonHoldCountdownTime <= 0 ) {
//        reemitPhoton();
//      }
//    }
//
//    protected void reemitPhoton() {
//      getMolecule().emitPhoton( absorbedWavelength );
//      getMolecule().setActiveStrategy( new NullPhotonAbsorptionStrategy( getMolecule() ) );
//      isPhotonAbsorbed = false;
//    }
//
//    @Override
//    public boolean queryAndAbsorbPhoton( Photon photon ) {
//      final boolean absorbed = super.queryAndAbsorbPhoton( photon );
//      if ( absorbed ) {
//        this.absorbedWavelength = photon.getWavelength();
//        photonAbsorbed();
//      }
//      return absorbed;
//    }
//
//    protected abstract void photonAbsorbed();
//  }
//
//  /**
//   * Photon absorption strategy that causes a molecule to vibrate after
//   * absorbing a photon, and re-emit the photon after some length of time.
//   */
//  public static class VibrationStrategy extends PhotonHoldStrategy {
//
//    public VibrationStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    protected void photonAbsorbed() {
//      getMolecule().setVibrating( true );
//    }
//
//    @Override
//    protected void reemitPhoton() {
//      super.reemitPhoton();
//      getMolecule().setVibrating( false );
//      getMolecule().setVibration( 0 );
//    }
//
//  }
//
//  /**
//   * Photon absorption strategy that causes a molecule to rotate after
//   * absorbing a photon, and re-emit the photon after some length of time.
//   */
//  public static class RotationStrategy extends PhotonHoldStrategy {
//
//    public RotationStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    protected void photonAbsorbed() {
//      getMolecule().setRotationDirectionClockwise( RAND.nextBoolean() );
//      getMolecule().setRotating( true );
//    }
//
//    @Override
//    protected void reemitPhoton() {
//      super.reemitPhoton();
//      getMolecule().setRotating( false );
//    }
//
//  }
//
//  /**
//   * Photon absorption strategy that causes a molecule to break apart after
//   * absorbing a photon.
//   */
//  public static class BreakApartStrategy extends PhotonAbsorptionStrategy {
//
//    public BreakApartStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    public void stepInTime( double dt ) {
//      // Basically, all this strategy does is to instruct the molecule
//      // to break apart, then reset the strategy.
//      getMolecule().breakApart();
//      getMolecule().setActiveStrategy( new NullPhotonAbsorptionStrategy( getMolecule() ) );
//    }
//  }
//
//  /**
//   * Photon absorption strategy that causes a molecule to enter an exited
//   * state after absorbing a photon, and then re-emit the photon after some
//   * length of time.  At the time of this writing, and "excited state" is
//   * depicted in the view as a glow that surrounds the molecule.
//   */
//  public static class ExcitationStrategy extends PhotonHoldStrategy {
//
//    public ExcitationStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    protected void photonAbsorbed() {
//      getMolecule().setHighElectronicEnergyState( true );
//    }
//
//    @Override
//    protected void reemitPhoton() {
//      super.reemitPhoton();
//      getMolecule().setHighElectronicEnergyState( false );
//    }
//  }
//
//  /**
//   * Photon absorption strategy that does nothing, meaning that it will
//   * never cause a photon to be absorbed.
//   */
//  public static class NullPhotonAbsorptionStrategy extends PhotonAbsorptionStrategy {
//    /**
//     * Constructor.
//     */
//    public NullPhotonAbsorptionStrategy( Molecule molecule ) {
//      super( molecule );
//    }
//
//    @Override
//    public void stepInTime( double dt ) {
//      // Does nothing.
//    }
//
//    /**
//     * This strategy never absorbs.
//     *
//     * @param photon
//     * @return
//     */
//    @Override
//    public boolean queryAndAbsorbPhoton( Photon photon ) {
//      return false;
//    }
//  }
//}
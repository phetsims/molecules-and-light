// Copyright 2002-2014, University of Colorado

/**
 * The original java file is PhotonAbsorptionStrategy.java.  This is common
 * code which will be used to define the photon absorption strategy for
 * molecules in simulations like "Greenhouse Gas" and "Molecules and Light"
 *
 * This is the base model for the strategies that define how a molecule
 * reacts to a given photon.  It is responsible for the following:
 * - Whether a given photon should be absorbed.
 * - How the molecule reacts to the absorption, i.e. whether it vibrates,
 * rotates, breaks apart, etc.
 * - Maintenance of any counters or timers associated with the reaction to
 * the absorption, such as those related to re-emission of an absorbed
 * photon.
 *
 * @author Jesse Greenberg
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Photon = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Photon' );
  var Property = require( 'AXON/Property' );

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

  /**
   * Constructor for photon absorption strategy.
   *
   * @param { Molecule } molecule - The molecule which will use this strategy.
   * @constructor
   */
  function PhotonAbsorptionStrategy( molecule ) {

    // Property that contains the probability that a given photon will be absorbed.
    this.photonAbsorptionProbabilityProperty = new Property( 0.5 );

    this.molecule = molecule;

    // Variables involved in the holding and re-emitting of photons.
    this.absorbedPhoton = new Photon();
    this.isPhotonAbsorbed = false;
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
      this.absorbedPhoton = null;
      this.isPhotonAbsorbed = false;
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
      var rand = RAND.nextDouble();
      var absorbed = (!this.isPhotonAbsorbed) && ( rand < this.photonAbsorptionProbabilityProperty.get() );
      if ( absorbed ) {
        this.isPhotonAbsorbed = true;
        this.photonHoldCountdownTime = MIN_PHOTON_HOLD_TIME + RAND.nextDouble() * ( MAX_PHOTON_HOLD_TIME - MIN_PHOTON_HOLD_TIME );
      }
      //TODO: Testing inheritance, remove this soon.
      return absorbed;
    },

    step: function()  {
      throw new Error( 'step should be implemented in descendant photon absorption strategies.' );
    }

  }, {

  } );
} );

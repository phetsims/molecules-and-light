// Copyright 2014-2017, University of Colorado Boulder

/**
 * Photon absorption strategy that causes a molecule to enter an exited state after absorbing a photon, and then re-emit
 * the photon after some length of time.  The "excited state" is depicted in the view as a glow that surrounds the
 * molecule.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculesAndLight = require( 'MOLECULES_AND_LIGHT/moleculesAndLight' );
  var PhotonHoldStrategy = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/PhotonHoldStrategy' );

  /**
   * Constructor for the excitation strategy.
   *
   * @param {Molecule} molecule - The molecule which will use this strategy.
   * @constructor
   */
  function ExcitationStrategy( molecule ) {

    // Supertype constructor
    PhotonHoldStrategy.call( this, molecule );

  }

  moleculesAndLight.register( 'ExcitationStrategy',ExcitationStrategy );

  return inherit( PhotonHoldStrategy, ExcitationStrategy, {

    photonAbsorbed: function() {
      // debugger;
      this.molecule.highElectronicEnergyStateProperty.set( true );
    },

    reemitPhoton: function() {
      PhotonHoldStrategy.prototype.reemitPhoton.call( this );
      this.molecule.highElectronicEnergyStateProperty.set( false );
    }
  } );
} );
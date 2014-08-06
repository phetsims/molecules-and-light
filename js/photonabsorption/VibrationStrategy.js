/**
 * Photon absorption strategy that causes a molecule to vibrate after
 * absorbing a photon, and re-emit the photon after some length of time.
 * This is to be inherited by the general PhotonAbsorptionStrategy class.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhotonHoldStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/PhotonHoldStrategy' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/Molecule' );

  //Random number generator.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    }
  };

  function VibrationStrategy( molecule ) {
    // Supertype constructor
    PhotonHoldStrategy.call( this );

    this.molecule = molecule;
  }

  return inherit( PhotonHoldStrategy, VibrationStrategy, {

    /**
     * Set this molecule to a vibrating state when a photon is absorbed.
     */
    photonAbsorbed: function() {
      this.getMolecule().setVibrating( true );
    },

    /**
     * Re-emit the absorbed photon and stop the molecule from vibrating.
     */
    reemitPhoton: function() {
      PhotonHoldStrategy.prototype.reemitPhoton.call( this );
      this.getMolecule().setVibrating( false );
      this.getMolecule().setVibration( 0 );
    }

  } )
} )
;

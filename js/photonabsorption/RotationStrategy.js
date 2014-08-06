/**
 * Photon absorption strategy that causes a molecule to rotate after
 * absorbing a photon, and re-emit the photon after some length of time.
 * This is to be inherited by the general PhotonAbsorptionStrategy class.
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
    },

    //TODO: Is this a decent way to implement a random boolean generator?
    nextBoolean: function() {
      var determinant = RAND.nextDouble();
      if ( RAND.nextDouble() < 0.555 ) {
        return false;
      }
      else {
        return true;
      }
    }
  };

  function RotationStrategy( molecule ) {
    // Supertype constructor
    PhotonHoldStrategy.call( this );

    this.molecule = molecule;
  }

  return inherit( PhotonHoldStrategy, RotationStrategy, {

    /**
     * Handle when a photon is absorbed.  Set the molecule to a rotating state
     * and set the direction of rotation to a random direction.
     */
    photonAbsorbed: function() {
      this.getMolecule().setRotationDirectionClockwise( RAND.nextBoolean() );
      this.getMolecule().setRotating( true );
    },

    /**
     * Re-emit the absorbed photon.  Set the molecule to a non-rotating state.
     */
    reemitPhoton: function() {
      PhotonHoldStrategy.prototype.reemitPhoton().call( this );
      this.getMolecule().setRotating( false );
    }

  } )
} )
;



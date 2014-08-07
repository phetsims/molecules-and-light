/**
 * Photon absorption strategy that causes a molecule to break apart after
 * absorbing a photon.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionStrategy' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );

  function BreakApartStrategy( molecule ) {
    // Supertype constructor
    PhotonAbsorptionStrategy.call( this, molecule );

  }

  return inherit( PhotonAbsorptionStrategy, BreakApartStrategy, {

    /**
     * The step method for the break apart strategy.  This function
     * instructs the molecule to break apart and then reset the
     * photon absorption strategy.
     *
     * @param {Number} - dt - The incremental time step
     */
    step: function( dt ) {
      // Basically, all this strategy does is to instruct the molecule
      // to break apart, then reset the strategy.
      this.getMolecule().breakApart();
      // TODO: Implement the NullPhotonAbsorptionStrategy Model.
      this.getMolecule().setActiveStrategy( new NullPhotonAbsorptionStrategy( this.getMolecule() ) );
    }

  } )
} )
;
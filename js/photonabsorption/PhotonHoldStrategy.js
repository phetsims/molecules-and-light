/**
 * Photon absorption strategy that defines behavior for a molecule holding on
 * to a photon.  The molecule will hold the photon and then after some amount
 * of time re-emit it.
 * This is to be inherited by the general PhotonAbsorptionStrategy class.
 *
 * @author Jesse Greenberg
 **/

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/PhotonAbsorptionStrategy' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/Molecule' );


  //Random number generator.
  //TODO: This can be removed after the rest of the file has been ported.
  //TODO: We created it temporarily to help during the porting process.
  var RAND = {
    nextDouble: function() {
      return Math.random();
    }
  };

  function PhotonHoldStrategy( molecule ) {
    // Supertype constructor
    PhotonAbsorptionStrategy.call( this );

    this.molecule = molecule;

    // Wavelength of the absorbed photon
    this.absorbedWavelength = 0;

  }

  return inherit( PhotonAbsorptionStrategy, PhotonHoldStrategy, {

    /**
     * The time step function for the photon holding strategy. Holds on to the photon
     * until the countdown time is zero and the re-emits the photon.
     *
     * @param {Number} dt - The incremental time step.
     */
    stepInTime: function( dt ) {
      this.photonHoldCountdownTime -= dt;
      if ( this.photonHoldCountdownTime <= 0 ) {
        console.log( 'You just emitted a photon' );
        this.reemitPhoton();
      }
    },

    /**
     * Re-emit the absorbed photon and reset the molecules absorption strategy to a
     * Null strategy.
     **/
    reemitPhoton: function() {
      console.log( 'You just re-emitted a photon' );
      console.log( this.getMolecule() );
      //this.getMolecule().emitNewPhoton( this.absorbedWavelength );
      //this.getMolecule().setActiveStrategy( new NullPhotonAbsorptionStrategy( getMolecule() ) );
      this.isPhotonAbsorbed = false;
    },

    /**
     * Determine if a particular photon should be absorbed and set this
     * absorbed wavelength to the wavelength of the photon.
     *
     * @param {Photon} photon
     * @return {Boolean} absorbed
     **/
    queryAndAbsorbPhoton: function( photon ) {
      //var absorbed = false;
      var absorbed = PhotonAbsorptionStrategy.prototype.queryAndAbsorbPhoton.call( this, photon );
      if ( absorbed ) {
        this.absorbedWavelength = photon.getWavelength();
        //photonAbsorbed(); TODO: Implement photonAbsorbed!
      }
      return absorbed;
    }

  } )
} )
;

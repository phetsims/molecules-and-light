define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PhotonAbsorptionStrategy = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/PhotonAbsorptionStrategy' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );

  function PhotonHoldStrategy( molecule ) {
    // Supertype constructor
    PhotonAbsorptionStrategy.call( this, molecule );

    // Wavelength of the absorbed photon
    this.absorbedWavelength = 0;

  }


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
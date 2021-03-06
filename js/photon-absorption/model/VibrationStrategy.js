// Copyright 2014-2020, University of Colorado Boulder

/**
 * Photon absorption strategy that causes a molecule to vibrate after absorbing a photon, and re-emit the photon after
 * some length of time. This is to be inherited by the general PhotonAbsorptionStrategy class.
 *
 * @author Jesse Greenberg
 */

import moleculesAndLight from '../../moleculesAndLight.js';
import PhotonHoldStrategy from './PhotonHoldStrategy.js';

class VibrationStrategy extends PhotonHoldStrategy {

  /**
   * Constructor for the break apart strategy.
   *
   * @param {Molecule} molecule - The molecule which will use this strategy.
   */
  constructor( molecule ) {

    // Supertype constructor
    super( molecule );

  }


  /**
   * Set this molecule to a vibrating state when a photon is absorbed.
   * @public
   */
  photonAbsorbed() {
    this.molecule.vibratingProperty.set( true );
  }

  /**
   * Re-emit the absorbed photon and stop the molecule from vibrating.
   * @public
   */
  reemitPhoton() {

    super.reemitPhoton();
    this.molecule.vibratingProperty.set( false );
    this.molecule.setVibration( 0 );
  }
}

moleculesAndLight.register( 'VibrationStrategy', VibrationStrategy );

export default VibrationStrategy;
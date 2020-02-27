// Copyright 2014-2020, University of Colorado Boulder

/**
 * Class that represents a single atom of oxygen in the model.  I hate to name a class "O", but it is necessary for
 * consistency with other molecules names.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import moleculesAndLight from '../../../moleculesAndLight.js';
import Atom from '../atoms/Atom.js';
import Molecule from '../Molecule.js';

/**
 * Constructor for a single atom of oxygen.
 *
 * @param {Object} [options]
 * @constructor
 */
function O( options ) {

  // Supertype constructor
  Molecule.call( this, options );

  // Instance Data
  // @private
  this.oxygenAtom = Atom.oxygen();

  // Configure the base class.
  this.addAtom( this.oxygenAtom );

  // Set the initial offsets.
  this.initializeAtomOffsets();

}

moleculesAndLight.register( 'O', O );

export default inherit( Molecule, O, {

  /**
   * Initialize and set the center of gravity offsets for the position of this Oxygen atom.
   */
  initializeAtomOffsets: function() {

    this.addInitialAtomCogOffset( this.oxygenAtom, new Vector2( 0, 0 ) );
    this.updateAtomPositions();

  }

} );
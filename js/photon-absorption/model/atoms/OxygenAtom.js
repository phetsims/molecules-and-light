// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atom of Oxygen in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var Atom = require( 'MOLECULES_AND_LIGHT/photon-absorption/model/atoms/Atom' );

  // Model data for the Oxygen atom.
  var REPRESENTATION_COLOR = new Color( 255, 85, 0 ); // Reddish color that also looks good in colorblind tests
  var MASS = 12.011;   // In atomic mass units (AMU).
  var RADIUS = 73;     // In picometers.

  // Static Data
  var instanceCount = 0; // Base count for the unique ID of this atomC

  /**
   * Constructor for an Oxygen atom.
   *
   * @constructor
   */
  function OxygenAtom() {
    // Supertype constructor
    Atom.call( this, REPRESENTATION_COLOR, RADIUS, MASS );

    this.uniqueID = 'oxygen' + instanceCount++;

  }

  return inherit( Atom, OxygenAtom );

} );

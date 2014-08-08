// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atom of hydrogen in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector2 = require( 'DOT/Vector2' );
  var Atom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/Atom' );

  // Model data for the carbon atom
  var REPRESENTATION_COLOR = Color.WHITE;
  var MASS = 1;   // In atomic mass units (AMU).
  var RADIUS = 37;     // In picometers.

  /**
   * Constructor for a carbon atom.  There is an optional Vector2 parameter
   * which specifies the location of this carbon atom.
   *
   * @param {*} options - Optional Vector2 for this carbon atom's location.
   * @constructor
   */
  function CarbonAtom( options ) {
    // Supertype constructor
    Atom.call( this, options );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      position: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    this.representationColor = REPRESENTATION_COLOR;
    this.radius = RADIUS;
    this.mass = MASS;
    this.position = options.position;

  }

  return inherit( Atom, CarbonAtom )

} );

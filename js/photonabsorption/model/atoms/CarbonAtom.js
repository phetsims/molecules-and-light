// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atom of Carbon in the model.
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
  var Property = require( 'AXON/Property' );

  // Model data for the carbon atom
  var REPRESENTATION_COLOR = Color.GRAY;
  var MASS = 12.011;   // In atomic mass units (AMU).
  var RADIUS = 77;     // In picometers.

  // Static data
  var instanceCount = 0; // Base count for the unique ID of this atom.

  /**
   * Constructor for a carbon atom.  There is an optional Vector2 parameter
   * which specifies the location of this carbon atom.
   *
   * @param {Object} [options]
   * @constructor
   */
  function CarbonAtom( options ) {
    // Supertype constructor
    Atom.call( this, options );

    options = _.extend( {
      // defaults
      positionProperty: new Property( new Vector2( 0, 0 ) ) // position of the atom
    }, options );
    this.options = options;
    this.uniqueID = 'carbon' + instanceCount++;
    this.representationColor = REPRESENTATION_COLOR;
    this.radius = RADIUS;
    this.mass = MASS;
    this.positionProperty = options.positionProperty;

  }

  return inherit( Atom, CarbonAtom );

} );

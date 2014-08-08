// Copyright 2002-2014, University of Colorado

/**
 * Class that represents an atom in the model.  This is used in the
 * microscopic view of photon abosorption.  This model is expected to be
 * extended by specific atoms.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * Constructor for the Atom.  Allows one to specify the color, radius, and
   * mass of this atom as well as an optional parameter describing the atom's
   * location.
   * @param {Color} representationColor - The desired color of the atom
   * @param {Number} radius - The radius of the model atom
   * @param {Number} mass - Mass of this atom
   * @param {*} options - An optional parameter to specify the position of this atom
   */
  function Atom( representationColor, radius, mass, options ) {
    // Supertype constructor
    Property.call( this );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      position: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    // Instance Variables
    this.representationColor = representationColor;
    this.radius = radius;
    this.mass = mass;
    this.position = options.position;

    this.link( function() { console.log( 'The Atoms location has been set!' )} );
  }

  return inherit( Property, Atom, {

    /**
     * Get the position of this Atom.
     *
     * @return {Vector2} - The position vector of this atom.
     */
    getPositionRef: function() {
      return this.position;
    },

    /**
     * Set the position of this atom from a single vector.
     *
     * @param {Vector2} position - The desired position of this atom as a Vector
     */
    setPositionVec: function( position ) {
      if ( this.position != position ) {
        this.position.set( position );
        this.set( position );
      }
    },

    /**
     * Set the position of this atom from point coordinates.
     *
     * @param {Number} x - The desired x coordinate of this atom
     * @param {Number} y - The desired y coordinate of this atom
     */
    setPosition: function( x, y ) {
      if ( this.position.x != x || this.position.y != y ) {
        this.position.setXY( x, y );
        this.set( x, y );
      }
    },

    /**
     * Get the representation color of this atom.
     *
     * @return {Color} representationColor - The color representing this atom
     */
    getRepresentationColor: function() {
      return this.representationColor;
    },

    /**
     * Get the radius of this atom.
     *
     * @return {Number} radius - The radius of this atom
     */
    getRadius: function() {
      return this.radius;
    },

    /**
     * Get the mass of this atom.
     *
     * @return {Number} mass - The mass of this atom.
     */
    getMass: function() {
      return this.mass;
    }
  } )
} );

//  //------------------------------------------------------------------------
//  // Methods
//  //------------------------------------------------------------------------

//  public Rectangle2D getBoundingRect() {
//    return new Rectangle2D.Double( position.getX() - radius, position.getY() - radius, radius * 2, radius * 2 );
//  }
//}

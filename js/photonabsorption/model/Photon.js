// Copyright 2002-2011, University of Colorado

/**
 * Ported from the original file Photon.java.  This will
 * model a particular photon.  Primarily keeps track of wavelength,
 * position, and velocity (as odd as that may seem) and can be stepped in
 * order to make the photon move in model space.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var PropertySet = require( 'AXON/PropertySet' );


  function Photon( wavelength ) {

    PropertySet.call( this, { location: new Vector2( 0, 0 )} );

    this.wavelength = wavelength;
    this.vx = 0;
    this.vy = 0;

  }

  return inherit( PropertySet, Photon, {

    /**
     * Set the velocity of this photon from vector components.
     *
     * @param {Number} vx - The x component of the velocity vector.
     * @param {Number} vy - The y component of the velocity vector.
     */
    setVelocity: function( vx, vy ) {
      this.vx = vx;
      this.vy = vy;
    },

    /**
     * Get the wavelength of this photon.
     *
     * @return {Number} wavelength
     */
    getWavelength: function() {
      return this.wavelength;
    },

    /**
     * Get the location of this Photon.
     *
     * @return {Vector2} location
     */
    getLocation: function() {
      return this.location;
    },

    /**
     * Set the location of this Photon from vector components.
     *
     * @param {Number} x - The x component of the position vector.
     * @param {Number} y - The y component of the positino vector.
     */
    setLocation: function( x, y ) {
      this.location.setXY( x, y );
      //setChanged(); TODO: This might be a method from java's Observable.  Find an equivalent.
      //notifyObservers(); TODO: This might be an method from java's Observable class.  Find an equivalent.
    },

    /**
     * Change the state of this photon by stepping it in time.
     *
     * @param {Number} dt - The incremental time step.
     */
    stepInTime: function( dt ) {
      this.setLocation( this.location.x + this.vx * dt, this.location.y + this.vy * dt );
    }

  } )
} );

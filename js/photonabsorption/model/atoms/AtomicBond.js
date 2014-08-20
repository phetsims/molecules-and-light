// Copyright 2002-2014, University of Colorado

/**
 * Model that represents an atomic bond between two atoms.
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
   * Constructor for an Atomic Bond between two atoms.
   *
   * @param {Atom} atom1 - Atom involved in the bond
   * @param {Atom} atom2 - Atom involved in the bond
   * @param {*} options - Indicates whether this is a single, double, triple, etc. bond.
   * @constructor
   *
   * TODO: The Original JAVA constructor implements some observers for the
   * TODO: atom states in the constructor.  I believe that the atoms
   * TODO: themselves have observers and event listeners prepared so I do not think
   * TODO: that we will need to implement them here.  I will keep thinking about it.
   */
  function AtomicBond( atom1, atom2, options ) {
    // Supertype constructor
    Property.call( this );

    // Options extension for variable bond count.
    options = _.extend( {
      // default bond count
      bondCount: 1
    }, options );
    this.options = options;

    this.atom1 = atom1;
    this.atom2 = atom2;
    this.bondCount = options.bondCount;

  }

  return inherit( Property, AtomicBond, {

    /**
     * Get the first atom in this atomic bond.
     *
     * @return {Atom} atom1
     */
    getAtom1: function() {
      return this.atom1;
    },

    /**
     * Get the second atom in this atomic bond.
     *
     * @return {Atom} atom2
     */
    getAtom2: function() {
      return this.atom2;
    },

    /**
     * Get the number of atomic bonds between the two atoms.
     *
     * @return {Number} bondCount
     */
    getBondCount: function() {
      return this.bondCount;
    }

  } )
} );

//  // ------------------------------------------------------------------------
//  // Constructor(s)
//  // ------------------------------------------------------------------------
//
//  /**
//   * Constructor.
//   */
//  public AtomicBond( Atom atom1, Atom atom2, int bondCount ) {
//    this.atom1 = atom1;
//    this.atom2 = atom2;
//    this.bondCount = bondCount;
//
//    // Listen to the atoms that are involved in this bond and send an
//    // update notification whenever they move.
//    this.atom1.addObserver( new SimpleObserver() {
//      public void update() {
//        notifyObservers();
//      }
//    } );
//    this.atom2.addObserver( new SimpleObserver() {
//      public void update() {
//        notifyObservers();
//      }
//    } );
//  }
//
//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------

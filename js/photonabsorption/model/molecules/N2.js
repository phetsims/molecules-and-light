`// Copyright 2002-2014, University of Colorado

/**
 * Class that represents N2 (nitrogen) in the model.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var NitrogenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/NitrogenAtom' );

  // Model data for nitrogen molecule
  var INITIAL_NITROGEN_NITROGEN_DISTANCE = 170; // In picometers.

  function N2( options ) {

    // Supertype constructor
    Molecule.call( this );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      position: new Vector2( 0, 0 )
    }, options );
    this.options = options;

    // Instance data for the nitrogen molecule
    this.nitrogenAtom1 = new NitrogenAtom();
    this.nitrogenAtom2 = new NitrogenAtom();
    this. nitrogenNitrogenBond = new AtomicBond( nitrogenAtom1, nitrogenAtom2, 3 );

  }

  return inherit( Molecule, N2, {



  } )

} );

//
//  // ------------------------------------------------------------------------
//  // Constructor(s)
//  // ------------------------------------------------------------------------
//
//  public N2( Point2D inititialCenterOfGravityPos ) {
//    // Configure the base class.  It would be better to do this through
//    // nested constructors, but I (jblanco) wasn't sure how to do this.
//    addAtom( nitrogenAtom1 );
//    addAtom( nitrogenAtom2 );
//    addAtomicBond( nitrogenNitrogenBond );
//
//    // Set the initial offsets.
//    initializeAtomOffsets();
//
//    // Set the initial COG position.
//    setCenterOfGravityPos( inititialCenterOfGravityPos );
//  }
//
//  public N2() {
//    this( new Point2D.Double( 0, 0 ) );
//  }
//
//  // ------------------------------------------------------------------------
//  // Methods
//  // ------------------------------------------------------------------------
//
//  /* (non-Javadoc)
//   * @see edu.colorado.phet.common.photonabsorption.model.Molecule#initializeCogOffsets()
//   */
//  @Override
//  protected void initializeAtomOffsets() {
//    addInitialAtomCogOffset( nitrogenAtom1, new MutableVector2D( -INITIAL_NITROGEN_NITROGEN_DISTANCE / 2, 0 ) );
//    addInitialAtomCogOffset( nitrogenAtom2, new MutableVector2D( INITIAL_NITROGEN_NITROGEN_DISTANCE / 2, 0 ) );
//
//    updateAtomPositions();
//  }
//}

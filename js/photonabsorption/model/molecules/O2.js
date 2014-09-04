// Copyright 2002-2014, University of Colorado

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Molecule = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/Molecule' );
  var AtomicBond = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/AtomicBond' );
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );

  // Model data for nitrogen molecule
  var INITIAL_OXYGEN_OXYGEN_DISTANCE = 170; // In picometers.

  function O2( model, options ) {

    // Supertype constructor
    Molecule.call( this, model );

    // Options extension for a possible input vector.
    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: Vector2.ZERO
    }, options );
    this.options = options;

    // Instance data for the nitrogen molecule
    this.oxygenAtom1 = new OxygenAtom();
    this.oxygenAtom2 = new OxygenAtom();
    this.oxygenOxygenBond = new AtomicBond( this.oxygenAtom1, this.oxygenAtom2, { bondCount: 2 } );
    this.initialCenterOfGravityPos = options.initialCenterOfGravityPos;

    // Configure the base class.
    this.addAtom( this.oxygenAtom1 );
    this.addAtom( this.oxygenAtom2 );
    this.addAtomicBond( this.oxygenOxygenBond );

    // Set the initial offsets
    this.initializeAtomOffsets();

    // Set the initial COG position.
    this.setCenterOfGravityPosVec( this.initialCenterOfGravityPos );

  }

  return inherit( Molecule, O2, {

    /**
     * Initialize and set the COG offsets for the oxygen atoms which compose this molecule.
     */
    initializeAtomOffsets: function() {
      this.addInitialAtomCogOffset( this.oxygenAtom1, new Vector2( -INITIAL_OXYGEN_OXYGEN_DISTANCE / 2, 0 ) );
      this.addInitialAtomCogOffset( this.oxygenAtom2, new Vector2( INITIAL_OXYGEN_OXYGEN_DISTANCE / 2, 0 ) );
      this.updateAtomPositions();
    }

  } )

} );



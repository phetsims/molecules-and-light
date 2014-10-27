// Copyright 2002-2014, University of Colorado

/**
 * Class that represents NO ( nitrogen monoxide ) in the model.
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
  var OxygenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/OxygenAtom' );
  var NitrogenAtom = require( 'MOLECULES_AND_LIGHT/photonabsorption/model/atoms/NitrogenAtom' );

  // Model Data for the nitrogen monoxide molecule.
  var INITIAL_NITROGEN_OXYGEN_DISTANCE = 170; // In picometers.

  /**
   * Constructor for a nitrogen monoxide molecule.
   *
   * @param { PhotonAbsorptionModel } model - The model which holds this molecule
   * @param { Object } options
   * @constructor
   */
  function NO( model, options ) {
    // Supertype constructor
    Molecule.call( this, model );

    options = _.extend( {
      // defaults
      initialCenterOfGravityPos: new Vector2( 0, 0 ) // center of gravity position of this molecule
    }, options );
    this.options = options;

    // Instance Data
    this.nitrogenAtom = new NitrogenAtom();
    this.oxygenAtom = new OxygenAtom();
    this.nitrogenOxygenBond = new AtomicBond( this.nitrogenAtom, this.oxygenAtom, { bondCount: 2 } );
    this.initialCenterOfGravityPos = options.initialCenterOfGravityPos;

    // Configure the base class.
    this.addAtom( this.nitrogenAtom );
    this.addAtom( this.oxygenAtom );
    this.addAtomicBond( this.nitrogenOxygenBond );

    // Set up the photon wavelengths to absorb.

    // Set the initial offsets.
    this.initializeAtomOffsets();

    // Set the initial center of gravity position.;
    this.setCenterOfGravityPosVec( this.initialCenterOfGravityPos );

  }

  return inherit( Molecule, NO, {

    /**
     * Initialize and set the COG positions for each atom which compose this NO molecule.
     */
    initializeAtomOffsets: function() {

      this.addInitialAtomCogOffset( this.nitrogenAtom, new Vector2( -INITIAL_NITROGEN_OXYGEN_DISTANCE / 2, 0 ) );
      this.addInitialAtomCogOffset( this.oxygenAtom, new Vector2( INITIAL_NITROGEN_OXYGEN_DISTANCE / 2, 0 ) );
      this.updateAtomPositions();

    }

  } );
} );



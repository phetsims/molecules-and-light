// Copyright 2002-2013, University of Colorado Boulder

/**
 * This type defines a control panel that selects between the various types of
 * photon emitters, i.e. microwave, infrared, visible, or ultraviolet.
 */
define( function( require ) {
  'use strict';

  // Modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );
  var VStrut = require( 'SUN/VStrut' );

  // Strings
  var microwaveString = require( 'string!/microwave' );
  var infraredString = require( 'string!BALANCING_ACT/infrared' );
  var visibleString = require( 'string!BALANCING_ACT/visible' );
  var ultravioletString = require( 'string!BALANCING_ACT/ultraviolet' );

  // Constants
  var PANEL_OPTION_FONT = { font: new PhetFont( 14 ) };
  var PANEL_TITLE_FONT = new PhetFont( 16 );


  /**
   * @param {Property} positionIndicatorStateProperty
   * @param {Object} options
   * @constructor
   */
  function PositionIndicatorControlPanel( positionIndicatorStateProperty, options ) {

    options = _.extend(
      {
        titleToControlsVerticalSpace: 5,
        minWidth: 0.1, // Can't be zero, so defaults to something small
        fill: 'rgb( 240, 240, 240 )',
        xMargin: 5
      }, options );

    var positionMarkerRadioButtons = new VerticalAquaRadioButtonGroup( [
      { node: new Text( noneString, PANEL_OPTION_FONT ), property: positionIndicatorStateProperty, value: 'none', label: noneString },
      { node: new Text( rulersString, PANEL_OPTION_FONT ), property: positionIndicatorStateProperty, value: 'rulers', label: rulersString },
      { node: new Text( marksString, PANEL_OPTION_FONT ), property: positionIndicatorStateProperty, value: 'marks', label: marksString }
    ], { radius: 8 } );
    var positionMarkerVBox = new VBox( {
      children: [
        new Text( positionString, PANEL_TITLE_FONT ),
        new VStrut( options.titleToControlsVerticalSpace ),
        new HStrut( Math.max( 0.1, options.minWidth - 2 * options.xMargin ) ),
        new HBox( { children: [ new HStrut( 10 ), positionMarkerRadioButtons ] } )
      ],
      align: 'left'
    } );

    Panel.call( this, positionMarkerVBox, options );
  }

  return inherit( Panel, PositionIndicatorControlPanel );
} );
/**
 * Mapbox Map
 */
import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { accessToken } from './accessToken';
import { mapStyles } from './mapStyles';

const styles = {
  map: {
    'position' : 'absolute',
    'bottom': 0,
    'top': 0,
    'width': '100%',
    'zIndex': 0
  }
}
/**
 * When Map is ready, enable Mapbox Configurations
 */
$( "#map" ).ready(function(){
  mapboxgl.accessToken = accessToken;
  var map = new mapboxgl.Map({
    container: 'map',
    style: mapStyles.demoMilitary,
    center: [43.128, 36.32],
    zoom: 15,
    attributionControl: false
  });
  map.addControl(new mapboxgl.Navigation());
  map.keyboard.disable()

  /**
  * On Click Functions
  */
  map.on('click', function(e){
    map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
      console.log(features);
    });
  });
  map.on('move', function(e){
    console.log(map.getCenter())
  });
})

class Map extends React.Component {
  render() {
    return (
      <div id="map" style={ styles.map }></div>
    )
  }
}

export default Map;

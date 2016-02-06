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
 * On Click Functions
 */
function handleClick(e) {
  map.featuresAt(e.point, {radius: 5}, function (err, features) {
    console.log(features);
  });
}

/**
 * When Map is ready, enable Mapbox Configurations
 */
$( "#map" ).ready(function(){
  mapboxgl.accessToken = accessToken;
  const map = new mapboxgl.Map({
    container: 'map',
    style: mapStyles.hybrid,
    center: [43.128, 36.32],
    zoom: 15,
    attributionControl: false
  });
  map.on('click', handleClick);
  map.keyboard.disable()
})

class Map extends React.Component {
  render() {
    return (
      <div id="map" style={ styles.map }></div>
    )
  }
}

export default Map;

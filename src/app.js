//import React from 'react';
//import ReactDOM from 'react-dom';
//import Timer from './components/timer.js'
//import Radium from 'radium';
//import mapboxgl from 'mapbox-gl';
import classicStyles from './modules/classicStyles';

// Mapbox Tokens
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

// Map Configuration
var map = new mapboxgl.Map({
  container: 'map',
  style: classicStyles('pacgeo.p054nodi'),
  center: [43.128, 36.32],
  zoom: 17,
  attributionControl: {'position': 'bottom-left'}
});
var geocoder = new mapboxgl.Geocoder();
map.addControl(geocoder);

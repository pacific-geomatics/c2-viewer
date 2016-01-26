//import React from 'react';
//import ReactDOM from 'react-dom';
//import Timer from './components/timer.js'
//import Radium from 'radium';
import mapboxgl from 'mapbox-gl';

// Mapbox Tokens
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

// Map Configuration
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [-75.0, 45.0],
  zoom: 15,
  attributionControl: {'position': 'bottom-left'}
});

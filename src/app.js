/**
 * C2 Viewer App
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import mapboxgl from 'mapbox-gl';
import './css/styles.css';

const App = React.createClass({
  render() {
    return (
      <Map />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// Mapbox Tokens
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

// Map Configuration
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/pacgeo/cik67f0kv008onykoyvznp1nq',
  center: [43.128, 36.32],
  zoom: 17,
  attributionControl: false
});

function handleClick(e) {
  map.featuresAt(e.point, {radius: 5}, function (err, features) {
    console.log(features);
  });
}

map.on('click', handleClick);
map.keyboard.disable()

export default map;

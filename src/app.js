/**
 * C2 Viewer App
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import { t } from './tokens';
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
mapboxgl.accessToken = t;

// Map Configuration
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/pacgeo/cik68r1ds00bs96kpiidveijr',
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

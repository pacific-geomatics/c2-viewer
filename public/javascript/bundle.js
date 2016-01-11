(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
mapboxgl.config.FORCE_HTTPS = true;

var styles = require('./styles');
var center = [-77.693, 8.155]

var map = new mapboxgl.Map({
  container: 'map',
  style: styles.imagery,
  center: center,
  zoom: 15,
  attributionControl: false,
}).addControl(new mapboxgl.Attribution({'position': 'bottom-left'}));

var mapLocation = new mapboxgl.Map({
  container: 'map-location',
  style: styles.topo,
  center: center,
  zoom: 10,
  attributionControl: false,
});

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

$('.btn.danger').button('toggle').addClass('fat')
},{"./styles":2}],2:[function(require,module,exports){
// Mapbox Styles Documentation
// https://www.mapbox.com/mapbox-gl-style-spec/#layer-type

var imageryStyle = {
    "version": 8,
    "name": "PacGeo Imagery",
    "sources": {
        "pacgeo-imagery": {
            "type": "raster",
            "url": "mapbox://pacgeo.o79jddlo",
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "imagery",
        "source": "pacgeo-imagery",
        "source-layer": "imagery"}]
};

module.exports.imagery = imageryStyle
module.exports.streets = 'mapbox://styles/mapbox/streets-v8';
module.exports.topo = 'mapbox://styles/mapbox/bright-v8';

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'

var styles = require('./styles');

var map = new mapboxgl.Map({
  container: 'map',
  style: styles.imagery,
  hash: true,
  center: [-77.693, 8.155],
  zoom: 15,
  attributionControl: false
});

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));
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

var streetsStyle = {
    "version": 8,
    "name": "Mapbox Streets",
    "sources": {
        "mapbox-streets": {
            "type": "raster",
            "url": "mapbox://mapbox.streets",
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "streets",
        "source": "mapbox-streets",
        "source-layer": "streets"}]
};

var topoStyle = {
    "version": 8,
    "name": "Mapbox Streets",
    "sources": {
        "mapbox-outdoors": {
            "type": "raster",
            "url": "mapbox://mapbox.outdoors",
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "outdoors",
        "source": "mapbox-outdoors",
        "source-layer": "outdoors"
    }]
};

module.exports.imagery = imageryStyle;
module.exports.streets = streetsStyle;
module.exports.topo = topoStyle;
},{}]},{},[1]);

// Tokens
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
mapboxgl.config.FORCE_HTTPS = true;

// Map Styles
var styleImagery = {
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
var styleStreets = 'mapbox://styles/mapbox/streets-v8';
var styleTopo = 'mapbox://styles/mapbox/bright-v8';

// Map Configuration
var center = [-77.693, 8.155]
var map = new mapboxgl.Map({
  container: 'map',
  style: styleImagery,
  center: center,
  zoom: 15,
  attributionControl: false,
}).addControl(new mapboxgl.Attribution({'position': 'bottom-left'}));

// Location Diagram
var mapLocation = new mapboxgl.Map({
  container: 'map-location',
  style: styleTopo,
  center: center,
  zoom: 10,
  attributionControl: false,
});

// Map controls
map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

$('.btn.danger').button('toggle').addClass('fat')
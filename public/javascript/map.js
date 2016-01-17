// Tokens
mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
mapboxgl.config.FORCE_HTTPS = true;
var zoomDifference = 5;
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
var styleTopographic = 'mapbox://styles/mapbox/bright-v8';

// Map Configuration
var center = [-77.693, 8.155]
var map = new mapboxgl.Map({
  container: 'map',
  style: styleImagery,
  center: center,
  zoom: 15,
  attributionControl: false,
}).addControl(new mapboxgl.Attribution({'position': 'bottom-left'}));
map.addControl(new mapboxgl.Geocoder());

// Location Diagram
var mapMini = new mapboxgl.Map({
  container: 'map-mini',
  style: styleTopographic,
  center: center,
  zoom: map.getZoom() - zoomDifference,
  attributionControl: false,
});

// Map controls
map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

$('.btn.danger').button('toggle').addClass('fat')


// Basemap controls
$(".basemap-imagery").click(function() {
  map.setStyle(styleImagery)
  $("#pacgeo-logo img").attr("src", "images/pacgeo_logo_white_360px.png")
});

$(".basemap-topographic").click(function() {
  map.setStyle(styleTopographic)
  $("#pacgeo-logo img").attr("src", "images/pacgeo_logo_grey_360px.png")
});

$(".basemap-streets").click(function() {
  map.setStyle(styleStreets)
  $("#pacgeo-logo img").attr("src", "images/pacgeo_logo_grey_360px.png")
});


// Bottom Controls
$(".controls-locate-me").click(function() {
  var zoom = 10
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  function successMap(pos) {
    map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: zoom })
  };

  function successMapMini(pos) {
    mapMini.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: zoom - zoomDifference })
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  navigator.geolocation.getCurrentPosition(successMap, error, options)
  navigator.geolocation.getCurrentPosition(successMapMini, error, options)
});


// Sync Mini Map with Map
map.on('moveend', function (e) {
    mapMini.flyTo({ center: map.getCenter(), zoom: map.getZoom() - zoomDifference })
});
// Map Styles
var styleImagery = {
    "version": 8,
    "name": "PacGeo Imagery",
    "sources": {
        "pacgeo-imagery": {
            "type": "raster",
            "url": "mapbox://" + imageryID,
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "imagery",
        "source": "pacgeo-imagery",
        "source-layer": "imagery"}]
};
var styleStreets = {
    "version": 8,
    "name": "PacGeo Streets",
    "sources": {
        "pacgeo-streets": {
            "type": "raster",
            "url": "mapbox://" + streetsID,
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "imagery",
        "source": "pacgeo-streets",
        "source-layer": "streets"}]
};
var styleTopographic = {
    "version": 8,
    "name": "PacGeo Topographic",
    "sources": {
        "pacgeo-streets": {
            "type": "raster",
            "url": "mapbox://" + topographicID,
            "tileSize": 256
        }
    },
    "layers": [{
        "type": "raster",
        "id": "imagery",
        "source": "pacgeo-streets",
        "source-layer": "streets"}]
};

// Map Configuration
var map = new mapboxgl.Map({
  container: 'map',
  style: styleImagery,
  center: center,
  zoom: zoom,
  attributionControl: false,
}).addControl(new mapboxgl.Attribution({'position': 'bottom-left'}));
var geocoder = new mapboxgl.Geocoder();
map.addControl(geocoder);

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

// Click on Map and add LatLng to search box
map.on("click", function(e) {
  lat = parseFloat(Math.round(e.lngLat.lat * 10000) / 10000).toFixed(4);
  lng = parseFloat(Math.round(e.lngLat.lng * 10000) / 10000).toFixed(4);
  latlng = lat + ', ' + lng
  $(".mapboxgl-ctrl-geocoder input").attr("value", latlng);
})
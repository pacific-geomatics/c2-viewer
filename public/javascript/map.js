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
            "url": "mapbox://mapbox.emerald",
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
            "url": "mapbox://mapbox.streets",
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
  attributionControl: {'position': 'bottom-left'}
});
var geocoder = new mapboxgl.Geocoder();
map.addControl(geocoder);
map.doubleClickZoom.disable();

// Location Diagram
var mapMini = new mapboxgl.Map({
  container: 'map-mini',
  style: styleStreets,
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
    $(".basemap-imagery").addClass('active');
    $(".basemap-topographic").removeClass('active');
    $(".basemap-streets").removeClass('active');
    $("#pacgeo-logo img").attr("src", "/images/pacgeo_logo_white_360px.png")
});

$(".basemap-topographic").click(function() {
    map.setStyle(styleTopographic)
    $(".basemap-imagery").removeClass('active');
    $(".basemap-topographic").addClass('active');
    $(".basemap-streets").removeClass('active');
    $("#pacgeo-logo img").attr("src", "/images/pacgeo_logo_grey_360px.png")
});

$(".basemap-streets").click(function() {
    map.setStyle(styleStreets)
    $(".basemap-imagery").removeClass('active');
    $(".basemap-topographic").removeClass('active');
    $(".basemap-streets").addClass('active');
    $("#pacgeo-logo img").attr("src", "/images/pacgeo_logo_grey_360px.png")
});

// Features
$(".features-collection-plan").click(function() {
  if ($(".features-collection-plan").hasClass('active')) {
    map.removeLayer("polygon");
    $(".features-collection-plan").toggleClass('active');
  } else {
    addLayer("polygon");
    $(".features-collection-plan").toggleClass('active');
  }
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


function addLayer(source) {
    map.addLayer({
        "id": source,
        "type": "line",
        "source": source,
        "interactive": true,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#1087bf",
            "line-width": 6
        }
    });
}

// Add Data
map.on('style.load', function () {
    var polygon = new mapboxgl.GeoJSONSource({data: '/panama/polygon.geojson'});

    // Add Sources
    map.addSource('polygon', polygon);
    addLayer('polygon')
});

map.on('dblclick', function (e) {
    var lat = parseFloat(Math.round(e.lngLat.lat * 10000) / 10000).toFixed(4);
    var lng = parseFloat(Math.round(e.lngLat.lng * 10000) / 10000).toFixed(4);
    var latlng = lat + ', ' + lng

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<big>" + latlng +"</big>" )
        .addTo(map);
});


// Click on Map and add LatLng to search box
map.on("click", function(e) {

})

map.on('click', function (e) {
    map.featuresAt(e.point, {layer: 'polygon', radius: 10, includeGeometry: true}, function (err, features) {
        if (err || !features.length)
            return;

        var feature = features[0];
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b><u>" + feature.properties.title +"</u></b><br/><p>" + feature.properties.description + "</p>")
            .addTo(map);
    });
});
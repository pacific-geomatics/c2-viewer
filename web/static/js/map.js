var attribs = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>';

var access_token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

var mapboxLight = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + access_token, {
    maxZoom: 19,
    attribution: attribs,
    id: 'mapbox.light'
});

var mapboxDark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + access_token, {
    maxZoom: 19,
    attribution: attribs,
    id: 'mapbox.dark'
});


var imagery = L.tileLayer('https://tile.addxy.com/chalkriver/{z}/{x}/{y}.png?api_key=123', {
    maxZoom: 20,
    id: 'imagery.2015'
});

var imageryDrape = L.tileLayer('https://tile.addxy.com/chalkriver-drape/{z}/{x}/{y}.png?api_key=123', {
    maxZoom: 20,
    id: 'imagery.drape.2014'
});

var baseLayers = {
    "Mapbox Light": mapboxLight,
    "Mapbox Dark": mapboxDark
};

var vectors = L.geoJson([buildingsGeoJson, aerowayGeoJson], {
    style: function(feature) {
        return {
            weight: 3,
            color: (typeof feature.properties.building === "undefined" ? "#00d493" : "#FF6000")
        };
    }
});

var powerlinesOverlay = L.geoJson([powerlinesGeoJson], {
    style: function(feature) {
        return {
            weight: 3,
            color: "#D42D00",
            dashArray: "5, 5, 1, 5"
        };
    }
});
var highwayOverlay = L.geoJson([highwaysGeoJson], {
    style: function(feature) {
        return {
            weight: 5,
            color: "#FFE873"
        };
    }
});

var overLays = {
    "Imagery": imagery,
    "Buildings": vectors,
    "Power Lines": powerlinesOverlay,
    "Roads": highwayOverlay
};

var map = L.map('map', {
    fullscreenControl: true,
    layers: [mapboxDark, imagery, vectors]
}).setView([46.052700, -77.364673], 17);

L.control.layers(baseLayers, overLays).addTo(map);
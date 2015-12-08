// Mapbox Styles Documentation
// https://www.mapbox.com/mapbox-gl-style-spec/#layer-type

var imageryStyle = {
    "version": 8,
    "name": "PacGeo Imagery",
    "sources": {
        "pacgeo-imagery": {
            "type": "raster",
            "url": "mapbox://pacgeo.neiemcnb",
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
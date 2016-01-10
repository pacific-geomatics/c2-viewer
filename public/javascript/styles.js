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

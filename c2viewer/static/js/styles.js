var darkStyle = 'mapbox://styles/pacgeo/cihh6waia00t86vm54p4kijoy'
var topoStyle = 'mapbox://styles/pacgeo/cihpsm758001u9nkp5386wtz9'
var imageryStyle = {
    "version": 8,
    "sources": {
        "imagery": {
            "type": "raster",
            "tiles": [
                "https://a.tiles.mapbox.com/v4/pacgeo.neiemcnb/{z}/{x}/{y}.jpg?access_token=" + mapboxgl.accessToken
                ],
            "tileSize": 256
        },
        "building-data": {
            "type": "vector",
            "url": "mapbox://rocksocker.1n8xkrjh"
        },
        "mapping-data": {
            "type": "vector",
            "url": "mapbox://rocksocker.70xj2wlp"
        },
        "zone-data": {
            "type": "vector",
            "url": "mapbox://rocksocker.61ibhdoe"
        }

    },
    "layers": [
    {
        "id": "imagery",
        "type": "raster",
        "source": "imagery",
        "minzoom": 0,
        "maxzoom": 21
    },
    {
        "id": "zone-data",
        "type": "line",
        "source": "zone-data",
        "source-layer": "CRL-Control-Zones",
        "minzoom": 0,
        "maxzoom": 21,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#c26161",
            "line-width": 3
        },
        "interactive": true
    },{
        "id": "mapping-data",
        "type": "line",
        "source": "mapping-data",
        "source-layer": "BUA-Mapping",
        "minzoom": 0,
        "maxzoom": 21,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#e3e3e3",
            "line-width": 1
        },
        "interactive": true
    },{
        "id": "building-data",
        "type": "line",
        "source": "building-data",
        "source-layer": "CNL-Buildings",
        "minzoom": 0,
        "maxzoom": 21,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#c7c7c7",
            "line-width": 1
        },
        "interactive": true
    }]
}

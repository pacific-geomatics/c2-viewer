var access_token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ja3NvY2tlciIsImEiOiJ6TW9qRS13In0.CVYX6dC0U_Ll_Fm-Yw--PA';
var map = new mapboxgl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": {
            "imagery": {
                "type": "raster",
                "tiles": [
                    'https://a.tiles.mapbox.com/v4/pacgeo.neiemcnb/{z}/{x}/{y}.jpg?access_token=' + access_token],
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
    },
    center: [-77.364673, 46.052700],
    zoom: 17
});




document.addEventListener('DOMContentLoaded', function(){

  var ccv = function(){
    var zoomin_control = document.querySelector('#zoom_in');
    var zoomout_control = document.querySelector('#zoom_out');
    var logout_control = document.querySelector('#logout');

    zoomin_control.addEventListener('click', function(e){
      var current_zoom =  map.getZoom();
      map.setZoom(current_zoom + 0.5);
    })

    zoomout_control.addEventListener('click', function(e){
      var current_zoom =  map.getZoom();
      map.setZoom(current_zoom - 0.5);
    });

    logout_control.addEventListener('click', function(e){
      location.href = '/logout'
    });

  }();

});


var map = new mapboxgl.Map({
    container: 'map',
    style: imageryStyle,
    center: CENTER,
    zoom: ZOOM
});

var url = 'https://b.tiles.mapbox.com/v4/' + DATA + '/features.json?access_token=pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

map.on('style.load', function () {
  var data = $.get(url).done(function() {
      data = data.responseJSON.features

      for (i = 0; i < data.length; i++) {
        var layer_id = 'Layer_' + i
        map.addSource(layer_id, { 'type': 'geojson', 'data': data[i] })

        if (data[i].geometry.type == 'LineString') {
            map.addLayer({
              'id': layer_id,
              'type': 'line',
              'source': layer_id,
              'layout': {},
              'paint': {
                "line-color": data[i].properties['stroke'],
                "line-width": data[i].properties['stroke-width']
              }
            });
            console.log('LineString', data[i])
        } else if (data[i].geometry.type == 'Point') {
            map.addLayer({
              "id": layer_id,
              "type": "symbol",
              "source": layer_id,
              "layout": {
                  "icon-image": data[i].properties['marker-symbol'] + "-15",
                  "text-field": data[i].properties['title'],
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 0.6],
                  "text-anchor": "top"
              },
              "paint": {
                  "text-size": 12
              }
          });
          console.log('Point', data[i])
        } else if (data[i].geometry.type == 'Polygon') {
          console.log('Polygon', data[i])
        }
      }
    });
});

document.addEventListener('DOMContentLoaded', function(){

  var ccv = function(){
    var zoomin_control = document.querySelector('#zoom_in');
    var zoomout_control = document.querySelector('#zoom_out');
    var logout_control = document.querySelector('#logout');
    var rotate_control = document.querySelector('#rotate');
    var tilt_control = document.querySelector('#tilt');
    var imagery_control = document.querySelector('#imagery');
    var topo_control = document.querySelector('#topo');
    var streets_control = document.querySelector('#streets');

    logout_control.addEventListener('click', function(e){
      location.href = '/logout'
    });

    // Slowly Fly to Location
    // https://www.mapbox.com/mapbox-gl-js/example/flyto-options/
    zoomin_control.addEventListener('click', function(e){
      console.log('Set Zoom In');
      map.flyTo({
        zoom: map.getZoom() + 1,
        speed: 0.3
      })
    })

    zoomout_control.addEventListener('click', function(e){
      console.log('Set Zoom Out');
      map.flyTo({
        zoom: map.getZoom() - 1,
        speed: 0.3
      })
    });

    tilt_control.addEventListener('click', function(e){
      console.log('Set Pitch');
      var cycle = {0: 30, 30: 60, 60: 0}
      map.setPitch(cycle[map.getPitch()])
    });

    rotate_control.addEventListener('click', function(e){
      console.log('Set Bearing')
      map.flyTo({
        bearing: map.getBearing() + 90,
        zoom: map.getZoom() + 0.01,
        speed: 0.005,
      })
    });

    // Basemaps
    // https://www.mapbox.com/mapbox-gl-js/example/setstyle/
    imagery_control.addEventListener('click', function(e){
      console.log('Change Imagery Basemap');
      map.setStyle(imageryStyle);
    });

    topo_control.addEventListener('click', function(e){
      console.log('Change Topographic Basemap');
      map.setStyle(topoStyle);
    });

    streets_control.addEventListener('click', function(e){
      console.log('Change Streets Basemap');
      map.setStyle(streetsStyle);
    });
  }();

});

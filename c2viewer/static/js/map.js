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

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));


document.addEventListener('DOMContentLoaded', function(){

  var ccv = function(){
    var logout_control = document.querySelector('#logout');
    var imagery_control = document.querySelector('#imagery');
    var topo_control = document.querySelector('#topo');
    var streets_control = document.querySelector('#streets');

    logout_control.addEventListener('click', function(e){
      location.href = '/logout'
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

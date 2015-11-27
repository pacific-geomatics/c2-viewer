mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: imageryStyle,
    center: [-77.364673, 46.052700],
    zoom: 17
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
    var dark_control = document.querySelector('#dark');

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

    dark_control.addEventListener('click', function(e){
      console.log('Change Imagery Basemap');
      map.setStyle('mapbox://styles/pacgeo/cihh6waia00t86vm54p4kijoy');
    });
  }();

});

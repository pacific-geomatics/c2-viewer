var access_token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ja3NvY2tlciIsImEiOiJ6TW9qRS13In0.CVYX6dC0U_Ll_Fm-Yw--PA';

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

    // Slowly Fly to Location
    // https://www.mapbox.com/mapbox-gl-js/example/flyto-options/
    zoomin_control.addEventListener('click', function(e){
      console.log('Set Zoom In')
      map.flyTo({
        zoom: map.getZoom() + 1,
        speed: 0.3
      })
    })

    zoomout_control.addEventListener('click', function(e){
      console.log('Set Zoom Out')
      map.flyTo({
        zoom: map.getZoom() - 1,
        speed: 0.3
      })
    });

    tilt_control.addEventListener('click', function(e){
      console.log('Set Pitch')
      var cycle = {0: 30, 30: 60, 60: 0}
      map.setPitch(cycle[map.getPitch()])
    });

    rotate_control.addEventListener('click', function(e){
      console.log('Set Bearing')
      map.flyTo({
        bearing: map.getBearing() + 90,
        zoom: map.getZoom() + 0.01,
        speed: 0.01,
        curve: 1,
        easing: function (t) {
          return t;
        }
      })
    });

    logout_control.addEventListener('click', function(e){
      location.href = '/logout'
    });

  }();

});

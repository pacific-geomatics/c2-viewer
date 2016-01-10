mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
mapboxgl.config.FORCE_HTTPS = true;

var styles = require('./styles');

var map = new mapboxgl.Map({
  container: 'map',
  style: styles.imagery,
  center: [-77.693, 8.155],
  zoom: 15,
  attributionControl: true,
});

var mapLocation = new mapboxgl.Map({
  container: 'map-location',
  style: styles.topo,
  center: [-77.693, 8.155],
  zoom: 10,
  attributionControl: false,
});

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

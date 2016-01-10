mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'

var styles = require('./styles');

var map = new mapboxgl.Map({
  container: 'map',
  style: styles.imagery,
  hash: true,
  center: [-77.693, 8.155],
  zoom: 15,
  attributionControl: false
});

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));
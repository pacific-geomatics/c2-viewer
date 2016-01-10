mapboxgl.accessToken = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'

// Set bounds to New York, New York
var bounds = [
  [-74.44747924804688, 40.54198241319326], // Southwest coordinates
  [-73.46282958984375, 40.93011520598305]  // Northeast coordinates
];

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  hash: true,
  center: [-74.0015, 40.7268],
  zoom: 14,
  maxBounds: bounds,
  attributionControl: false
});

map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

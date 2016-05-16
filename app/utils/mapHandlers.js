import converter from 'coordinator'
import mapboxgl from 'mapbox-gl'

export default function getPosition(map, zoomOffset=0) {
  return {
    center: map.getCenter(),
    zoom: map.getZoom() + zoomOffset,
    bearing: map.getBearing(),
    pitch: map.getPitch()
  }
}

export function getBounds(geometry) {
  if (geometry.bounds) {
    let northeast = geometry.bounds.northeast
    let southwest = geometry.bounds.southwest
    let ne = new mapboxgl.LngLat(northeast.lng, northeast.lat)
    let sw = new mapboxgl.LngLat(southwest.lng, southwest.lat)

    return new mapboxgl.LngLatBounds(sw, ne)
  }
}

export function getCenter(geometry) {
  if (geometry.location) {
    return [geometry.location.lng, geometry.location.lat]
  }
}

export function getPrecision(zoom) {
  let precision = 3

  if ( zoom > 14 ) { precision = 5 }
  else if ( zoom > 10 ) { precision = 4 }

  return precision
}

export function getMGRS(lat, lng, precision) {
  const toUSNG = converter('latlong', 'usng')
  return toUSNG(lat, lng, precision)
}

export function getLatLng(mgrs) {
  const toLatLng = converter('usng', 'latlong')
  return toLatLng(mgrs)
}

export function getPrettyLatLng(lat, lng, precision) {
  lat = lat.toFixed(precision)
  lng = lng.toFixed(precision)

  return `${lat}, ${lng}`
}

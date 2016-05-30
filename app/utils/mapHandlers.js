import converter from 'coordinator'
import mapboxgl from 'mapbox-gl'

export function getBounds(bbox) {
  if (bbox) {
    let ne = new mapboxgl.LngLat(bbox[0], bbox[1])
    let sw = new mapboxgl.LngLat(bbox[2], bbox[3])
    return new mapboxgl.LngLatBounds(sw, ne)
  }
}

export function getPrecision(zoom) {
  let precision = 3

  if ( zoom > 14 ) { precision = 5 }
  else if ( zoom > 10 ) { precision = 4 }

  return precision
}

export function getMGRS(lat, lng, zoom) {
  let toUSNG = converter('latlong', 'usng')
  return toUSNG(lat, lng, getPrecision(zoom))
}

export function getLatLng(mgrs) {
  let toLatLng = converter('usng', 'latlong')
  return toLatLng(mgrs)
}

export function getPrettyLatLng(lat, lng, precision) {
  lat = lat.toFixed(precision)
  lng = lng.toFixed(precision)

  return `${lat}, ${lng}`
}

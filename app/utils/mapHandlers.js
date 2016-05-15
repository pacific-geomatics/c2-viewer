import converter from 'coordinator'

/**
 * Get map position
 *
 * @returns {
 *   center: { lat: float, lng: float },
 *   zoom: int,
 *   bearing: int,
 *   pitch: int
 * }
 */
export function getPosition(map, zoomOffset=0) {
  return {
    center: map.getCenter(),
    zoom: map.getZoom() + zoomOffset,
    bearing: map.getBearing(),
    pitch: map.getPitch()
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

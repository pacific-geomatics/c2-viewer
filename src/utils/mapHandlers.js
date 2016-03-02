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

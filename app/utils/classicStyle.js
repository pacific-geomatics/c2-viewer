/**
 * Creates a Mapbox's Classic Styles
 *
 * @module c2viewer/classStyles
 * @param {mapID} Mapbox's map identifier
 * @returns {style} Classic Style schema
 * @example
 * var map = new mapboxgl.Map({
 *   container: 'map',
 *   style: classicStyles('pacgeo.p054nodi'),
 * });
 * Mapbox Baselayers
 * - streets
 * - outdoors
 * - satellite
 */

export function classicStyle(url, mapID) {
  var sources = {}
  sources[mapID] = {
    'type': 'raster',
    'tiles': [url],
    'tileSize': 256
  }
  return {
    'version': 8,
    'name': mapID,
    'sources': sources,
    'layers': [{
      'type': 'raster',
      'id': mapID,
      'source': mapID,
      'source-layer': mapID + '-layer'
    }]
  }
}

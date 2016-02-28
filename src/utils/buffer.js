var jsts = require('jsts')
var turf = require('turf')
var fs = require('fs')

var radius = 5
var reader = new jsts.io.WKTReader()
var geom = reader.read('POINT (-75 0)')
var buffered = geom.buffer(radius)

var writer = new jsts.io.GeoJSONWriter()
buffered = writer.write(buffered)

var feature = {
  type: 'Feature',
  geometry: buffered,
  properties: {}
}

fs.writeFile('/home/denis/buffer-Equator.geojson', JSON.stringify(feature), (err) => {
  if (err) throw err
  console.log('Saved')
})

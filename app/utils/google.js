import 'isomorphic-fetch'
import { Promise } from 'es6-promise'

export function google(location) {
  return new Promise((resolve, reject) => {
    if (!location) reject('No location')
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ location }`
    let options = {
      method: 'get'
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

export function getBounds(geometry) {
  if (geometry) {
    if (geometry.bounds) {
      let ne = geometry.bounds.northeast
      let sw = geometry.bounds.southwest
      return [sw.lng, sw.lat, ne.lng, ne.lat]
    }
  }
}

function main(){
  let location = 'Ottawa, Ontario'
  google(location)
    .then(data => console.log(getBounds(data.results[0].geometry)))
    .catch(error => console.log(error))
}

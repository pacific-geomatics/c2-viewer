import 'isomorphic-fetch'
import { Promise } from 'es6-promise'

export function getStyle(style, token) {
  return new Promise((resolve, reject) => {
    let mapId = style.match(/mapbox:\/\/styles\/(.*)/)[1]
    let url = `https://api.mapbox.com/styles/v1/${ mapId }?access_token=${ token }`
    let options = {
      method: 'get',
      headers: new Headers({'Access-Control-Allow-Origin': '*'})
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

function main() {
  let token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
  let style = 'mapbox://styles/pacgeo/ciosvpybb000vbpnkd5ybp41f'
  getStyle(style, token)
    .then(data => console.log(data))
}

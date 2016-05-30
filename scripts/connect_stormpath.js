import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import base64 from 'base-64'
import utf8 from 'utf8'

const headers = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})

function encodeAccount(username, password) {
  let bytes = utf8.encode(`${ username }:${ password }`)
  return base64.encode(bytes)
}

function checkStatus(response) {
  if (response.ok) console.log('Connection OK')
  else console.log(response.statusText)
  return response
}

async function retrieveApplication(application, authentication) {
  return new Promise((resolve, reject) => {
    let url = `https://${ encodeURIComponent(authentication) }@api.stormpath.com/v1/applications/${ application }`
    let options = {
      method: 'get',
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      cache: 'default'
    }
    fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

async function createAccount(application, authentication, payload) {
  return new Promise((resolve, reject) => {
    let url = `https://${ encodeURIComponent(authentication) }@api.stormpath.com/v1/applications/${ application }/accounts`
    let options = {
      method: 'post',
      headers: headers,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(payload)
    }
    fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

async function authenticateAccount(application, authentication, username, password) {
  return new Promise((resolve, reject) => {
    let url = `https://${ encodeURIComponent(authentication) }@api.stormpath.com/v1/applications/${ application }/loginAttempts`
    let payload = {
      type: 'basic',
      value: encodeAccount(username, password)
    }
    let options = {
      method: 'post',
      headers: headers,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(payload)
    }
    fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

async function main() {
  let application = 'zDhRIszpk93AwssJDXuPs'
  let authentication = '1HU99B538PG3SW50K5M2NPJBW:7ukbB9oDRjgyMEX/057SKtAwwLtOR3fbKvNQOp4i/uI'
  //let app = await retrieveApplication(application, authentication)
  let payload = {
    givenName: 'Denis',
    surname: 'Storm',
    username: 'DenisC',
    email: 'foo.bar@gmail.com',
    password: 'Password123',
    customData: {
      color: 'red'
    }
  }
  let create = await createAccount(application, authentication, payload)
  let account = await authenticateAccount(application, authentication, payload.email, payload.password)
  //let result = await retrieveApplication('carriere.denis@gmail.com', 'password')
}
main()

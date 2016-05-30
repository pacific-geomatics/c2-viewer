import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import AWS from 'aws-sdk'
import fs from 'fs'
import MapboxClient from 'mapbox'


function getCredentials(access_token) {
  return new Promise((resolve, reject) => {
    let url = `https://api.mapbox.com/uploads/v1/addxy/credentials?access_token=${ access_token }`
    fetch(url)
    .then(response => response.json())
    .then(data => resolve(data))
  })
}

function getS3(credentials) {
  return new Promise((resolve, reject) => {
    let params = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      region: 'us-east-1'
    }
    resolve(new AWS.S3(params))
  })
}

function putS3(credentials, s3, filePath) {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: credentials.bucket,
      Key: credentials.key,
      Body: fs.createReadStream(filePath)
    }
    s3.putObject(params, (error, data) => {
      console.log(data)
    })
  })
}

function upload(credentials, s3, filePath) {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: credentials.bucket,
      Key: credentials.key,
      Body: fs.createReadStream(filePath)
    }
    s3.putObject(params, (error, data) => {
      console.log(data)
    })
  })
}


async function main() {
  let filePath = './scripts/Suffied.geojson'
  let access_token = 'sk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lvdDBsaGpxMDBhaXVmbTRieWMyc3FmMyJ9.DF-1Xrnp61TFxeHRQ-HQNw'

  const client = MapboxClient(access_token)
  console.log(client)

}
main()

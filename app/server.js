import fs from 'fs'
import path from 'path'
import robots from 'robots.txt'
import express from 'express'
import favicon from 'serve-favicon'
import webpack  from 'webpack'
import stormpath from 'express-stormpath'
import config  from '../webpack.config'
import { port } from './config'

// Configure
const compiler = webpack(config)
const app = global.app = express()

// Enable Stormpath
app.use(stormpath.init(app, {
  website: true
}));

// Static files
//app.use(express.static('./dist'))
//app.use(express.static('./src/public'))
app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')))
app.use(robots(path.resolve(__dirname, 'public', 'robots.txt')))


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

/**
 * Routing
 */
app.get('/', stormpath.loginRequired, function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/pdac', stormpath.groupsRequired(['pacgeo', 'pdac'], false), function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Starting Server
app.on('stormpath.ready', function () {
  app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
});

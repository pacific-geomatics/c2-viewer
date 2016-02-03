import fs from 'fs';
import path from 'path';
import robots from 'robots.txt';
import express from 'express';
import favicon from 'serve-favicon';
import stormpath from 'express-stormpath';
import { port } from './config';
/**
 * Configure
 */
const app = global.app = express();

/**
 * Enable Stormpath
 */
app.use(stormpath.init(app, {
  website: true
}));

/**
 * Static files
 */
app.use(express.static('./dist'));
app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')));
app.use(robots(path.resolve(__dirname, 'public', 'robots.txt')));

/**
 * Starting Server
 */
app.on('stormpath.ready', function () {
  app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
});

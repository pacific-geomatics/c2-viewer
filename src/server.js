import path from 'path';
import favicon from 'serve-favicon';
import robots from 'robots.txt';
import express from 'express';
import stormpath from 'express-stormpath';
import { port } from './config';
import index from './routes';

// Configure
const app = global.app = express();

// Enable Stormpath
app.use(stormpath.init(app, {
  website: true
}));

// Static files
app.use(express.static('./dist'));
app.use(favicon('./dist/favicon.ico'));
app.use(robots('./dist/robots.txt'));

// Views
app.use('/', index)
app.use('/panama', stormpath.groupsRequired(['cnl', 'pacgeo'], false), index)

// Starting Server
app.on('stormpath.ready', function () {
  app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
});

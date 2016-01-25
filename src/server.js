import path from 'path';
import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';
import robots from 'robots.txt';
import express from 'express';
import stormpath from 'express-stormpath';
import gulp from 'gulp';
import Router from './routes';
import { port } from './config';
import index from './routes/index';
import panama from './routes/panama';

// Configure
const app = global.app = express();

// Enable Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

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
app.use('/panama', panama)

// Starting Server
app.on('stormpath.ready', function () {
  app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
});

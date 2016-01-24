import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';
import path from 'path';
import robots from 'robots.txt';
import express from 'express';
import stormpath from 'express-stormpath';
import gulp from 'gulp';
import panama from './routes/panama';
import index from './routes/index';

(function () {
  'use strict';

  // Constants
  const PORT = 3000;

  // Configure
  var app = express();

  // Enable Nunjucks
  nunjucks.configure('views', {
      autoescape: true,
      express: app
  });

  // Enable Stormpath
  app.use(stormpath.init(app, {
    website: true
  }));

  // Static files
  app.use(express.static(__dirname + '/public'));
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(robots(path.join(__dirname, 'public', 'robots.txt')));

  // Views
  app.use('/', index)
  app.use('/panama', panama)

  // Starting Server
  app.on('stormpath.ready', function () {
    app.listen(PORT, function () {
      console.log('Example app listening on port 3000!');
    });
  });
})();

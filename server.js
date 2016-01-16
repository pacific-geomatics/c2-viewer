#!/usr/bin/env node

'use strict';

// NodeJS Requirements
import nunjucks from 'nunjucks';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import robots from 'robots.txt';

// Constants
const PORT = 3000;

// Configure
var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Static files
app.use(express.static('public'));
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(robots(path.join('public', 'robots.txt')));

// Views
app.get('/', function(req, res) {
    res.render('map.html');
});

// Start Server
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
})
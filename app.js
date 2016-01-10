'use strict';
import nunjucks from 'nunjucks';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

// Configure
var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static('public'));
app.use(favicon(path.join('public', 'favicon.ico')));

// Views
app.get('/', function(req, res) {
    res.render('map.html');
});

module.exports = app;
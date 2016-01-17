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
app.use(express.static(__dirname + '/public'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(robots(path.join('public', 'robots.txt')));

// Mapbox Tokens
var token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'

// Views
app.get('/', function(req, res) {
    res.render('map.html', {
        center: [27.5492, -62.5864],
        zoom: 2,
        imagery: 'pacgeo.onak54hl',
        token: token
    });
});

app.get('/:var(SierraLeone|sierraLeone|sierraleone|leaddog|leadDog|LeadDog)?', function(req, res) {
    res.render('map.html', {
        center: [7.8732, -10.9358],
        zoom: 12,
        imagery: 'pacgeo.onak54hl',
        token: token
    });
});

app.get('/:var(cnl|CNL)?', function(req, res) {
    res.render('map.html', {
        center: [46.052, -77.365],
        zoom: 15,
        imagery: 'pacgeo.neiemcnb',
        token: token
    });
});

app.get('/:var(panama|Panama)?', function(req, res) {
    res.render('map.html', {
        center: [8.1564, -77.6917],
        zoom: 15,
        imagery: 'pacgeo.o79jddlo',
        token: token
    });
});

// Start Server
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
})

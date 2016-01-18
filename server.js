#!/usr/bin/env node

'use strict';

// NodeJS Requirements
import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';
import path from 'path';
import robots from 'robots.txt';
import express from 'express';
import stormpath from 'express-stormpath';
import fs from 'fs';
import browserify from 'browserify';

// Constants
const PORT = 3000;

// Configure
var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(stormpath.init(app, {
  website: true
}));

// Static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/data'));
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(robots(path.join('public', 'robots.txt')));

// Mapbox Tokens
var token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
var locations = [
    { name: "World", href: ""},
    { name: "Daru, Sierra Leone", href: "Daru-Sierra-Leone" },
    { name: "Yaviza, Panama", href: "Yaviza-Panama"},
    { name: "CNL", href: "CNL"}
]

// Views
app.get('/:var(|World)?', function(req, res) {
    res.render('map.html', {
        center: [27.5492, -62.5864],
        zoom: 2,
        imagery: 'pacgeo.onak54hl',
        token: token,
        locations: locations
    });
});

app.get('/Daru-Sierra-Leone', function(req, res) {
    res.render('map.html', {
        center: [7.9878, -10.8424],
        zoom: 15,
        imagery: 'pacgeo.onak54hl',
        token: token,
        locations: locations
    });
});

// CNL Config
var configCNL = {
    imagery: 'pacgeo.neiemcnb',
    token: token,
    locations: [
        { name: "World", href: ""},
        { name: "CNL", href: "CNL"},
        { name: "Chalk River", href: "Chalk-River"},
        { name: "Petawawa", href: "Petawawa"},
        { name: "Deep River", href: "Deep-River"},
    ]
};

// CNL Location - CNL
app.get('/CNL', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.052, -77.365];
    configCNL.zoom = 15;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Chalk River
app.get('/Chalk-River', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.022030, -77.451456];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Deep River
app.get('/Deep-River', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.100351, -77.488929];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Petawawa
app.get('/Petawawa', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [45.8948, -77.2681];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// Panama
app.get('/Yaviza-Panama', function(req, res) {
    res.render('map.html', {
        center: [8.1564, -77.6917],
        zoom: 15,
        imagery: 'pacgeo.o79jddlo',
        token: token,
        user: req.user,
        locations: locations
    });
});

// Generate local GeoJSON data
app.get('/data/:project/:geom.geojson', function(req, res) {
    var geom = req.params.geom;
    var project = req.params.project;
    res.json(JSON.parse(fs.readFileSync('./data/' + project + '/' + geom + '.geojson')));
});

// Convert Client-side Javascript
browserify("./public/javascript/map.js")
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(fs.createWriteStream("./public/javascript/bundle.js"));

// Starting Server
// Once Stormpath has initialized itself, start your web server!
app.on('stormpath.ready', function () {
    app.listen(PORT, function () {
      console.log('Example app listening on port 3000!');
    })
});

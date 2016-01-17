#!/usr/bin/env node

'use strict';

// NodeJS Requirements
import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';
import path from 'path';
import robots from 'robots.txt';
import express from 'express';
import stormpath from 'express-stormpath';
var router = express.Router();

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
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(robots(path.join('public', 'robots.txt')));

// Mapbox Tokens
var token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
var locations = ["World", "SierraLeone", "Panama", "CNL"]

// Views
app.get('/:var(|World|world)?', function(req, res) {
    res.render('map.html', {
        center: [27.5492, -62.5864],
        zoom: 2,
        imagery: 'pacgeo.onak54hl',
        token: token,
        locations: locations
    });
});

app.get('/:var(SierraLeone|sierraLeone|sierraleone|leaddog|leadDog|LeadDog)?', function(req, res) {
    res.render('map.html', {
        center: [7.8732, -10.9358],
        zoom: 12,
        imagery: 'pacgeo.onak54hl',
        token: token,
        locations: locations
    });
});

// CNL Config
var configCNL = {
    imagery: 'pacgeo.neiemcnb',
    token: token,
    locations: ["CNL", "ChalkRiver", "DeepRiver", "Petawawa"]
};

// CNL Location - CNL
app.get('/:var(cnl|CNL)?', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.052, -77.365];
    configCNL.zoom = 15;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Chalk River
app.get('/:var(chalkriver|ChalkRiver)?', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.022030, -77.451456];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Deep River
app.get('/:var(deepriver|DeepRiver)?', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.100351, -77.488929];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Petawawa
app.get('/:var(petawawa|Petawawa)?', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [45.8948, -77.2681];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});


app.get('/:var(panama|Panama)?', function(req, res) {
    res.render('map.html', {
        center: [8.1564, -77.6917],
        zoom: 15,
        imagery: 'pacgeo.o79jddlo',
        token: token,
        user: req.user,
        locations: locations
    });
});



app.get('/basemaps', function(req, res) {
    if (req.user) {
        res.json({ hello: req.user.fullName })
    } else {
        res.json({ hello: "Guest" })
    }
});

// Starting Server
// Once Stormpath has initialized itself, start your web server!
app.on('stormpath.ready', function () {
    app.listen(PORT, function () {
      console.log('Example app listening on port 3000!');
    })
});

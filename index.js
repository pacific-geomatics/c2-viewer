// NodeJS Requirements
const nunjucks = require('nunjucks');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const robots = require('robots.txt')

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

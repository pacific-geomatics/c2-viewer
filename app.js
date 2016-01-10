// Imports
var nunjucks = require('nunjucks')
var express = require('express')

// Configure
var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static('public'));

// Views
app.get('/', function(req, res) {
    res.render('map.html');
});

// Deploy
app.listen(3000, function () {
  console.log('C2 Viewer app listening on port 3000!');
})

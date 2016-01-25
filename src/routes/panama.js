import express from 'express';

(function () {
  'use strict';
  
  var router = express.Router();

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
  // define the home page route
  router.get('/', function(req, res) {
    res.render('map.html', {
      center: [8.1564, -77.6917],
      zoom: 16,
      imagery: 'pacgeo.o79jddlo',
      token: token,
      user: req.user,
      locations: locations
    });
  });
  // define the about route
  router.get('/about', function(req, res) {
    res.send('About panama');
  });

  module.exports = router;
})();

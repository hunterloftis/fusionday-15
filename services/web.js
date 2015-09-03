var jackrabbit = require('jackrabbit');
var express = require('express');
var path = require('path');
var parallel = require('../lib/parallel');

var RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
var PORT = process.env.PORT || 5000;
var SERVICE_TIME = process.env.SERVICE_TIME || 1000;

var broker = jackrabbit(RABBIT_URL);

broker.once('connected', function() {
  broker.create('weather.get');
  broker.create('map.get');
  broker.create('animal.get');
  broker.create('message.get');

  var app = express()
    .set('view engine', 'jade')
    .set('view cache', true)
    .get('/', parallel([ getWeather, getMap, getAnimal, getMessage ], SERVICE_TIME), renderHome)
    .listen(PORT, onListen);

  function onListen(err) {
    if (err) throw err;
    console.log('Listening on', PORT);
  }

  function getWeather(req, res, next) {
    console.log('Requesting weather');
    broker.publish('weather.get', { zipcode: req.query.zipcode || '28203' }, function onWeather(err, weather) {
      res.locals.weather = weather;
      next();
    });
  }

  function getMap(req, res, next) {
    console.log('Requesting map');
    broker.publish('map.get', { zipcode: req.query.zipcode || '28203' }, function onMap(err, map) {
      res.locals.map = map;
      next();
    });
  }

  function getAnimal(req, res, next) {
    console.log('Requesting animal');
    broker.publish('animal.get', { width: 600, height: 300 }, function onAnimal(err, animal) {
      res.locals.animal = animal;
      next();
    });
  }

  function getMessage(req, res, next) {
    console.log('Requesting message');
    broker.publish('message.get', { name: 'Hunter' }, function onMessage(err, message) {
      res.locals.message = message;
      next();
    });
  }

  function renderHome(req, res, next) {
    console.log('Rendering page');
    res.render(path.join(__dirname, '../index.jade'));
  }
});

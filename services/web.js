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
  broker.create('kitten.get');
  broker.create('message.get');

  var app = express()
    .set('view engine', 'jade')
    .set('view cache', true)
    .get('/', parallel([ getWeather, getMap, getKitten, getMessage ], SERVICE_TIME), renderHome);

  function getWeather(req, res, next) {
    console.log('Requesting weather');
    broker.publish('weather.get', { zipcode: req.query.zipcode }, function onWeather(err, weather) {
      res.locals.weather = weather;
      next();
    });
  }

  function getMap(req, res, next) {
    console.log('Requesting map');
    broker.publish('map.get', { zipcode: req.query.zipcode }, function onMap(err, map) {
      res.locals.map = map;
      next();
    });
  }

  function getKitten(req, res, next) {
    console.log('Requesting kitten');
    broker.publish('kitten.get', {}, function onKitten(err, kitten) {
      res.locals.kitten = kitten;
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
    res.render(path.join(__dirname, '../index.jade'));
  }
});

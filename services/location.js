var jackrabbit = require('jackrabbit');
var weather = require('weather-js');
var url = require('url');

var RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
var broker = jackrabbit(RABBIT_URL);

broker.once('connected', function() {
  broker.create('weather.get', function() {
    broker.handle('weather.get', getWeather);
  });
  broker.create('map.get', function() {
    broker.handle('map.get', getMap);
  });
});

function getWeather(message, reply) {
  console.log('Message: weather');
  weather.find({ search: message.zipcode, degreeType: 'F' }, function(err, result) {
    var temp = result && result[0] && result[0].current.temperature;
    if (err || !result) reply();
    else reply("It's currently " + temp + " degrees in " + message.zip);
  });
}

function getMap(message, reply) {
  console.log('Message: map');
  reply(url.format({
    host: 'maps.googleapis.com',
    path: '/maps/api/staticmap'
    query: {
      center: 'Brooklyn Bridge, New York',
      size: '600x300'
    }
  }));
}

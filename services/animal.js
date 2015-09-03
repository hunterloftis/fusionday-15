var jackrabbit = require('jackrabbit');
var url = require('url');

var RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
var broker = jackrabbit(RABBIT_URL);

broker.once('connected', function() {
  console.log('Listening for animal messages');
  broker.create('animal.get', function() {
    broker.handle('animal.get', getAnimal);
  });
});

// TODO: make this send an image with the width of message.width and height of message.height
// Maybe from lorempixel? (http://lorempixel.com/400/200/animals/)
function getAnimal(message, reply) {
  console.log('Message: animal');
  var kittenUrl = '';
  reply(kittenUrl);
}

var jackrabbit = require('jackrabbit');
var url = require('url');

var RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
var broker = jackrabbit(RABBIT_URL);

broker.once('connected', function() {
  console.log('Listening for "message" messages');
  broker.create('message.get', function() {
    broker.handle('message.get', getMessage);
  });
});

// TODO: make this send a message for the sub-header
function getMessage(message, reply) {
  console.log('Message: message');
  reply('');
}

var jackrabbit = require('jackrabbit');
var url = require('url');

// This is where we connect to the message broker (An AMQP service)
var RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
var broker = jackrabbit(RABBIT_URL);

// Once connected, we listen for certain types of messages - the ones this
// service knows how to handle.
broker.once('connected', function() {
  console.log('Listening for "message" messages');
  broker.create('message.get', function() {
    broker.handle('message.get', getMessage);
  });
});

// When we receive a message that this service understands, we reply to it
// ... and that's it!
// TODO: make this send a message for the sub-header
function getMessage(message, reply) {
  console.log('Message: message');
  reply('');
}

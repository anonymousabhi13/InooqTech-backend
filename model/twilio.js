const twilio = require('twilio');

const accountSid = 'ACdbab06d555214557caeb6cbced8d3a51'; // Your Account SID from www.twilio.com/console
const authToken = 'c1edfcc7cd25426826fdd3ac371d05bf'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node',
    to: '+918817836116', // Text this number
    from: '+18304064474', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
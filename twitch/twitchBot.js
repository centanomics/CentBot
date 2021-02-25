const tmi = require('tmi.js');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
}

const client = new tmi.client(opts);

client.on('message', (target, context, msg, self) => {
  if (self) { return }
  
  client.say(target, 'Hello')
});

client.on('connected', (addr, port) => {
  console.log(`CentanomicsBot is online!`)
});

client.connect();

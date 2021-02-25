// @command     pings
// @desc        a check to see if the bot is working
// @access      all
module.exports = {
  name: 'ping',
  description: 'This makes the bot reply pong!',
  mod: false,
  execute: (client, channel, msg, args) => {
    client.say(channel, "pong");
  },
};

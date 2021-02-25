// @command     pings
// @desc        a check to see if the bot is working
// @access      all
module.exports = {
  name: 'ping',
  description: 'This makes the bot reply pong!',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    message.channel.send('pong!');
  },
};

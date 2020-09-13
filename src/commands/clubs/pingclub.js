// @command     pingclub
// @desc        pings a club
// @access      all
module.exports = {
  name: 'pingclub',
  description: 'pings a club',
  mod: false,
  execute: (message, args) => {
    message.channel.send('pong!');
  },
};

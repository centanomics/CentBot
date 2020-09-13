// @command     joinclub
// @desc        join a club
// @access      all
module.exports = {
  name: 'joinclub',
  description: 'join a club',
  mod: false,
  execute: (message, args) => {
    message.channel.send('pong!');
  },
};

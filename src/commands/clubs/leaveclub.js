// @command     leaveclub
// @desc        leave a club
// @access      all
module.exports = {
  name: 'leaveclub',
  description: 'leave a club',
  mod: false,
  execute: (message, args) => {
    message.channel.send('pong!');
  },
};

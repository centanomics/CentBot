// @command     report
// @desc        report a comment
// @access      all
module.exports = {
  name: 'ping',
  description: 'reports a comment',
  mod: false,
  execute: (message, args) => {
    message.channel.send('pong!');
  },
};

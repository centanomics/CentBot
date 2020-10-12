// @command     report
// @desc        report a comment
// @access      all
module.exports = {
  name: 'ping',
  description: 'reports a comment',
  mod: false,
  execute: (message, args) => {
    // just the report maker, user they are reporting, and broken rule
    message.channel.send('');
  },
};

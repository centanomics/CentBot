// @command     report
// @desc        report a comment
// @access      all
module.exports = {
  name: 'report',
  description: '[WIP] reports a comment',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    // just the report maker, user they are reporting, and broken rule
    message.channel.send('report');
  },
};

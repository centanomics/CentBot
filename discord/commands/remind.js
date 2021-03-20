// @command     remind
// @desc        sets up a reminder
// @access      all
module.exports = {
  name: 'remind',
  description: 'Sets up a reminder',
  delay: 10,
  mod: false,
  execute: (message, args) => {
    setTimeout(() => {
      message.channel.send(args.join(' '))
    }, 5000)
  },
};

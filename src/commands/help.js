module.exports = {
  name: 'help',
  description: 'Shows a list of commands',
  execute: async (message, args) => {
    message.channel.send('list of commands');
  },
};

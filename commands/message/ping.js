module.exports = {
  name: 'ping',
  description: 'This makes the bot reply pong!',
  execute(message, args) {
    message.channel.send('pong!');
  },
};

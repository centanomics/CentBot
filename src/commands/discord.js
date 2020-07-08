module.exports = {
  name: 'discord',
  description: 'This gives you a discord link you can use',
  execute(message, args) {
    message.channel.send('https://discord.gg/Z2hw3B6');
  },
};

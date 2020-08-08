module.exports = {
  name: 'unmute',
  description: 'unmutes people',
  execute: (message, args) => {
    const user = message.mentions.members.first();
    user.roles.remove('601979552956416011');
  },
};

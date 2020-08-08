module.exports = {
  name: 'mute',
  description: 'mutes people',
  execute: async (message, args) => {
    const user = message.mentions.members.first();
    user.roles.add('601979552956416011');
  },
};

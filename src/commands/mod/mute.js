module.exports = {
  name: 'mute',
  description: 'mutes people',
  execute: async (message, args) => {
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      message.reply("You don't have permission to use this command!");
    } else {
      const user = message.mentions.members.first();
      user.roles.add('601979552956416011');
    }
  },
};

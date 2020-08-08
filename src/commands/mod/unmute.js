module.exports = {
  name: 'unmute',
  description: 'unmutes people',
  execute: (message, args) => {
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      message.reply("You don't have permission to use this command!");
    } else {
      const user = message.mentions.members.first();
      user.roles.remove('601979552956416011');
    }
  },
};

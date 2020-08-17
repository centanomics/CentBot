// @command     unlock
// @desc        undo a readonly channel
// @access      all
module.exports = {
  name: 'unlock',
  description: 'undo a readonly channel',
  execute: (message, args) => {
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      message.reply("You don't have permission to use this command!");
    } else {
      let everyoneRole = message.guild.roles.everyone.id;
      message.channel.overwritePermissions(
        [
          {
            id: everyoneRole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
        ],
        'closing channel'
      );
      message.channel.send('Unlocked channel.');
    }
  },
};

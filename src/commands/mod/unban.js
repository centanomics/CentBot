// @command     unban
// @desc        unbans a user
// @access      moderators
module.exports = {
  name: 'unban',
  description: 'revokes a users ban',
  execute: async (message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.channel.send("You don't have permission to use that command.");
    } else {
      await message.guild.members.unban(args[0]);
    }
  },
};

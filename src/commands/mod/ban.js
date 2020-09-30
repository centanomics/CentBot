// @command     ban
// @desc        bans a user
// @access      moderators
module.exports = {
  name: 'ban',
  description: 'bans a user',
  mod: true,
  execute: async (message, args) => {
    const user = message.mentions.users.first();
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

    if (message.author.equals(user)) {
      message.channel.send("You can't ban yourself!");
    } else if (member.hasPermission('ADMINISTRATOR')) {
      message.channel.send("That user has mod/admin, you can't ban them");
    } else if (member) {
      try {
        await member.ban(reason);
      } catch (error) {
        console.log(error);
        message.channel.send(error.message);
      }
    }
  },
};

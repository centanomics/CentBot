module.exports = {
  name: 'ban',
  description: 'bans a user',
  execute: async (message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.channel.send("You don't have permission to use that command.");
    } else {
      const user = message.mentions.users.first();
      const member = message.mentions.members.first();
      const reason = args.slice(1).join(' ');

      if (message.author.equals(user)) {
        message.channel.send("You can't ban yourself!");
      } else if (member) {
        try {
          await member.ban(reason);
        } catch (error) {
          console.log(error);
          message.channel.send(error.message);
        }
      }
    }
  },
};

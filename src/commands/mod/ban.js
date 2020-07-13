module.exports = {
  name: 'ban',
  description: 'Bans a user',
  execute: async (message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.channel.send("You don't have permission to use that command.");
    } else {
      const user = message.mentions.users.first();
      const member = message.mentions.members.first();

      if (message.author.equals(user)) {
        message.channel.send("You can't ban yourself!");
      } else if (member) {
        try {
          await member.ban();
          message.channel.send(`${user.tag} was banned`);
        } catch (error) {
          console.log(error);
          message.channel.send(error.message);
        }
      }
    }
  },
};

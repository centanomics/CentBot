module.exports = {
  name: 'kick',
  description: 'Kicks a user',
  execute: async (message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.channel.send("You don't have permission to use that command.");
    } else {
      const user = message.mentions.users.first();
      const member = message.mentions.members.first();
      const channel = await message.client.channels.fetch('731129813095546982');
      const reason = args.slice(1).join(' ');

      if (message.author.equals(user)) {
        message.channel.send("You can't kick yourself!");
      } else if (member) {
        try {
          await member.kick(reason);
          channel.send(`\`${user.tag}\` was kicked because of \`${reason}\``);
        } catch (error) {
          console.log(error);
          message.channel.send(error.message);
        }
      }
    }
  },
};

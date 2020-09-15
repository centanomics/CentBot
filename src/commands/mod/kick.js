// @command     kick
// @desc        kicks a user
// @access      moderators
module.exports = {
  name: 'kick',
  description: 'Kicks a user',
  mod: true,
  execute: async (message, args) => {
    const user = message.mentions.users.first();
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

    if (message.author.equals(user)) {
      message.channel.send("You can't kick yourself!");
    } else if (member) {
      try {
        await member.kick(reason);
      } catch (error) {
        console.log(error);
        message.channel.send(error.message);
      }
    }
  },
};

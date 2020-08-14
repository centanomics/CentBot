// @command     avatar
// @desc        gets a users avatar or your own
// @access      all
module.exports = {
  name: 'avatar',
  description: 'Gets your avatar',
  execute: (message, args) => {
    if (args.length === 0) {
      message.channel.send(
        message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 512,
        })
      );
    } else {
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply(
          'Please make sure to properly mention a user, idiot'
        );
      }
      return message.channel.send(
        `${user.username}'s avatar: ${user.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 512,
        })}`
      );
    }
  },
};

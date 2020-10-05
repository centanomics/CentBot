const Clubs = require('../../models/clubs');

// @command     leaveclub
// @desc        leave a club
// @access      all
module.exports = {
  name: 'leaveclub',
  description: 'leave a club',
  mod: false,
  execute: async (message, args) => {
    try {
      const club = await Clubs.find({
        name: args[0],
        guildId: message.guild.id,
      });
      if (club.length === 0)
        throw { message: "You can't leave a club you're not in" };

      message.member.roles.remove(club[0].roleId);
      message.channel.send(`You left the ${club[0].name} club`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

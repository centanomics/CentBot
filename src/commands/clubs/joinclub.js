const Clubs = require('../../models/clubs');

// @command     joinclub
// @desc        join a club
// @access      all
module.exports = {
  name: 'joinclub',
  description: 'join a club',
  mod: false,
  execute: async (message, args) => {
    try {
      const club = await Clubs.find({ name: args[0] });
      if (club.length === 0)
        throw { message: "You can't join a nonexistent club!" };

      message.member.roles.add(club[0].roleId);
      message.channel.send(`You joined the ${club[0].name} club`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

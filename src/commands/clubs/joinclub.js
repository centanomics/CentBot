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
      // gets all clubs for the guild
      const club = await Clubs.find({
        name: args[0],
        guildId: message.guild.id,
      });

      //shows user list of clubs they can join if they don't enter a valid club name
      if (club.length === 0) {
        const clubs = await Clubs.find({ guildId: message.guild.id });
        let rtnString = 'List of clubs you can join:\n';
        for (let i = 0; i < clubs.length; i++) {
          rtnString += `${i + 1}. ${clubs[i].name}\n`;
        }
        throw { message: rtnString };
      }

      // checks to see if a user is already in a club
      message.member.roles.cache.map(async (role) => {
        try {
          const cloob = await Clubs.findOne({ roleId: role.id });
          if (cloob) {
            throw { message: 'You are already in this club!' };
          }
        } catch (err) {
          throw { message: err.message };
        }
      });

      message.member.roles.add(club[0].roleId);
      message.channel.send(`You joined the ${club[0].name} club`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

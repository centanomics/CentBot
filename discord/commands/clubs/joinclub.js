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
      // gets all the club for the guild by name
      const club = await Clubs.findOne({
        name: args[0],
        guildId: message.guild.id,
      });
      //shows user list of clubs in the server if they don't enter a valid club name
      if (!club) {
        const clubs = await Clubs.find({ guildId: message.guild.id });
        let rtnString = 'List of clubs you can join:\n';
        for (let i = 0; i < clubs.length; i++) {
          rtnString += `- ${clubs[i].name}\n`;
        }
        throw { message: rtnString };
      }

      // checks to see if a user is already in a club
      const userRoles = Array.from(message.member.roles.cache.keys());
      for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i] === club.roleId) {
          throw { message: 'You already joined this club!' };
        }
      }

      // give the user the appropriate role and notifies them
      message.member.roles.add(club.roleId);
      message.channel.send(`You joined the ${club.name} club`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

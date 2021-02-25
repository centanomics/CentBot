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
      // gets the club user wants to leave
      const club = await Clubs.findOne({
        name: args[0],
        guildId: message.guild.id,
      });

      const guildClubs = await Clubs.find({ guildId: message.guild.id });
      const userClubs = Array.from(message.member.roles.cache.keys());

      // if the club doesnt exist, shows the user the list of clubs they are in
      if (!club) {
        let rtnString = 'List of clubs you can leave:\n';
        for (let i = 0; i < userClubs.length; i++) {
          if (
            guildClubs.findIndex(
              (guildClub) => guildClub.roleId === userClubs[i]
            ) !== -1
          ) {
            const clubsToLeave = guildClubs.filter(
              (guildClub) => guildClub.roleId === userClubs[i]
            );
            rtnString += `- ${clubsToLeave[0].name}\n`;
          }
        }
        if (rtnString === 'List of clubs you can leave:\n') {
          throw { message: "You aren't in any clubs!" };
        } else {
          throw { message: rtnString };
        }
      }

      // checks if user is in club. If they are, they leave it.
      // if they arent it tells them they arent in that club
      if (userClubs.findIndex((userClub) => userClub === club.roleId) !== -1) {
        message.member.roles.remove(club.roleId);
        message.channel.send(`You left the ${club.name} club`);
      } else {
        throw { message: "You aren't in this club!" };
      }
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

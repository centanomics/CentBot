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
      const club = await Clubs.find({
        name: args[0],
        guildId: message.guild.id,
      });
      if (club.length === 0) {
        const clubs = await Clubs.find({});
        let rtnString = 'List of clubs you can join:\n';
        for (let i = 0; i < clubs.length; i++) {
          rtnString += `${i + 1}. ${clubs[i].name}\n`;
        }
        throw { message: rtnString };
      }

      message.member.roles.add(club[0].roleId);
      message.channel.send(`You joined the ${club[0].name} club`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

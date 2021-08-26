const Clubs = require('../../models/clubs');

// @command     pingclub
// @desc        pings a club that they are in.
// @access      all
module.exports = {
  name: 'pingclub',
  description: 'pings a club',
  delay: 3600000,
  mod: false,
  execute: async (message, args) => {
    try {
      const club = await Clubs.find({
        name: args[0],
        guildId: message.guild.id,
      });
      if (club.length === 0)
        throw { message: "You can't ping a nonexistent club!" };

      message.channel.send(`<@&${club[0].roleId}>`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

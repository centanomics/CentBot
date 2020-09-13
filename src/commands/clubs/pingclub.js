const Clubs = require('../../models/clubs');

// @command     pingclub
// @desc        pings a club
// @access      all
module.exports = {
  name: 'pingclub',
  description: 'pings a club',
  mod: false,
  execute: async (message, args) => {
    try {
      const club = await Clubs.find({ name: args[0] });
      if (club.length === 0)
        throw { message: "You can't ping a nonexistent club!" };

      message.channel.send(`<@&${club[0].roleId}>`);
    } catch (err) {
      console.log(err.message);
      message.channel.send(err.message);
    }
  },
};

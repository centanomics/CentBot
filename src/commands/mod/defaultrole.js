const Defaults = require('../../models/defaults');

// @command     defaultrole
// @desc        sets a default role for the server
// @access      mod
module.exports = {
  name: 'defaultrole',
  description: 'sets a default role for the server',
  mod: true,
  execute: async (message, args) => {
    try {
      const role = message.mentions.roles.first();
      const newDefault = new Defaults({
        guildId: message.guild.id,
        roleId: role.id,
      });
      await newDefault.save();
      message.channel.send(
        `${args[0]} set as the default role for this server`
      );
    } catch (err) {
      console.log(err);
      message.channel.send(err.message);
    }
  },
};

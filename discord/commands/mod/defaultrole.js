const Defaults = require('../../models/defaults');

// @command     defaultrole
// @desc        sets a default role for the server
// @access      mod
module.exports = {
  name: 'defaultrole',
  description: 'sets a default role for the server',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    try {
      const defaultRole = await Defaults.findOne({ guildId: message.guild.id });

      const role = message.mentions.roles.first();
      if (!role) {
        throw { message: 'You have to tag a proper role!' };
      }

      const newDefault = new Defaults({
        guildId: message.guild.id,
        roleId: role.id,
      });
      await newDefault.save();
      message.channel.send(
        `${args[0]} set as the default role for this server`
      );
      console.log(role.name);

      if (defaultRole) {
        await defaultRole.remove();
      }
    } catch (err) {
      console.log(err);
      message.channel.send(err.message);
    }
  },
};

const Channels = require('../../models/channels');

// @command     logs
// @desc        toggles a log channel for this server
// @access      mod
module.exports = {
  name: 'logs',
  description: 'toggles a log channel for this server',
  mod: true,
  execute: async (message, args) => {
    const logChannel = await Channels.find({
      name: 'log',
      guildId: message.guild.id,
    });

    // checks to see if a log channel exists.
    // If it does, delete it, if it doesn't, create one
    if (!logChannel[0]) {
      // create channel then create data object

      const newChannel = await message.guild.channels.create('log', {
        type: 'text',
        topic: 'Modlog',
        position: 1000,
        permissionOverwrites: [
          { id: message.guild.roles.everyone.id, deny: ['VIEW_CHANNEL'] },
        ],
      });
      const channelData = new Channels({
        name: newChannel.name,
        channelId: newChannel.id,
        guildId: message.guild.id,
      });
      await channelData.save();
      message.channel.send('logs enabled');
    } else {
      await message.guild.channels.resolve(logChannel[0].channelId).delete();
      await Channels.findByIdAndRemove(logChannel[0]._id);
      message.channel.send('logs disabled');
    }
  },
};

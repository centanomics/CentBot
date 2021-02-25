const Channels = require('../models/channels');

const modAuth = {
  // checks if the user is a mod
  isAuthorized: (message, reply) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      reply
        ? message.reply("You don't have permission to use this command!")
        : null;
      return false;
    } else {
      return true;
    }
  },
  sendLog: async (message, guild) => {
    // sends to log, if the channel exists
    const channelObject = await Channels.findOne({
      name: 'log',
      guildId: guild.id,
    });

    if (channelObject) {
      const channel = guild.channels.resolve(channelObject.channelId);
      channel.send(message);
    }
  },
};

module.exports = modAuth;

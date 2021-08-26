const Channels = require('../../models/channels');

// deletes a channel on the server when its deleted locally
module.exports = async (client, channel) => {
  try {
    const channelToRemove = await Channels.findOne({
      channelId: channel.id,
    });
    if (channelToRemove) {
      await Channels.findByIdAndRemove(channelToRemove._id);
    }
  } catch (err) {
    console.log(err);
  }
};

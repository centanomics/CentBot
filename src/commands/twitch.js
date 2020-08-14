// @command     twitch
// @desc        links my twitch channel
// @access      all
module.exports = {
  name: 'twitch',
  description: "Links Cent's Twitch channel",
  execute: (message, args) => {
    message.channel.send('https://www.twitch.tv/centanomics');
  },
};

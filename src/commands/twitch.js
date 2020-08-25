// @command     twitch
// @desc        links my twitch channel
// @access      all
module.exports = {
  name: 'twitch',
  description: "Links Cent's Twitch channel",
  mod: false,
  execute: (message, args) => {
    message.channel.send('https://www.twitch.tv/centanomics');
  },
};

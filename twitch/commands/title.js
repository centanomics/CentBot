const axios = require('axios');
// @command     title
// @desc        shows the title of the stream
// @access      all
module.exports = {
  name: 'ping',
  description: 'This makes the bot reply pong!',
  mod: false,
  execute: async (client, channel, msg, args) => {
    try {
      const config = {
        headers: {
          'client-id': process.env.TWITCH_ID
        }
      };
      const res = await axios.get(`https://api.twitch.tv/helix/users?login=${channel.substring(1)}`, config);
      console.log(res)
      client.say(channel, "stream title");
    } catch (err) {
      console.log(err)
    }
  },
};

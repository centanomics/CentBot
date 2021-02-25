const axios = require('axios')

// @command     random user
// @desc        gets a random user from chat
// @access      mod
module.exports = {
  name: 'randomuser',
  description: 'gets a random user from chat',
  mod: false,
  execute: async (client, channel, msg, args) => {
    const res = await axios.get(`https://tmi.twitch.tv/group/user/${channel.substring(1)}/chatters`);
    const { chatter_count, chatters } = res.data;
    const { vips, moderators, staff, admins, global_mods, viewers } = chatters;
      
    
    const users = [...vips, ...moderators, ...staff, ...admins, ...global_mods, ...viewers];
    client.say(channel, `@${users[Math.floor(Math.random() * Math.floor(chatter_count - 1))]}`)
    
    // client.say(channel, "pong");
  },
};
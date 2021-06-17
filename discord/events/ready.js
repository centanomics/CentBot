// sends a log once the client is ready
module.exports = async (client) => {
  console.log('Penny is online!');
  client.user.setPresence({
    status: 'dnd', //You can show online, idle....
    activity: {
      name: '$help', //The message shown
      type: 'PLAYING', //PLAYING: WATCHING: LISTENING: STREAMING:
    },
  });
};

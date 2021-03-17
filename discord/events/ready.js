// sends a log once the client is ready
module.exports = async (client) => {
  console.log('Penny is online!');
  const channel = await client.channels.fetch('521497382572130304');
  let reminder = setInterval(() => {
    channel.send('WATCH THE FREAKING HAIKYUU EPISODE ALREADY');
  }, 86400000)
};

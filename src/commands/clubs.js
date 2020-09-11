// @command     clubs
// @desc        manages clubs for tags and stuff
// @access      all
module.exports = {
  name: 'clubs',
  description: 'Manages clubs for tags and stuff',
  mod: false,
  execute: (message, args) => {
    message.channel.send('starting to manage clubs');
    switch (args[0]) {
      case 'create':
        message.channel.send('create');
        return;
      case 'join':
        message.channel.send('join');
        return;
      case 'leave':
        message.channel.send('delete');
        return;
      case 'delete':
        message.channel.send('leave');
        return;
    }
  },
};

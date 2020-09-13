const createClub = () => {};

const showClubs = () => {};

const deleteClub = () => {};

// @command     clubs
// @desc        manages clubs for tags and stuff
// @access      all
module.exports = {
  name: 'clubs',
  description: 'Manages clubs for tags and stuff',
  mod: false,
  execute: (message, args) => {
    switch (args[0]) {
      case 'create':
        message.channel.send('create');
        return;
      case 'join':
        message.channel.send('show');
        return;
      case 'leave':
        message.channel.send('delete');
        return;
    }
  },
};

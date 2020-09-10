// @command     clubs
// @desc        manages clubs for tags and stuff
// @access      all
module.exports = {
  name: 'clubs',
  description: 'Manages clubs for tags and stuff',
  mod: false,
  execute: (message, args) => {
    message.channel.send('starting to manage clubs');
  },
};

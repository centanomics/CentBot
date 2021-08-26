// @command     unmute
// @desc        unmutes a user
// @access      moderators
module.exports = {
  name: 'unmute',
  description: 'unmutes people',
  delay: 0,
  mod: true,
  execute: (message, args) => {
    const user = message.mentions.members.first();
    user.roles.remove('601979552956416011');
  },
};

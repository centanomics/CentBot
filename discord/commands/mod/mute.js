// @command     mute
// @desc        mutes a user
// @access      moderators
module.exports = {
  name: 'mute',
  description: 'mutes people',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    const user = message.mentions.members.first();
    user.roles.add('601979552956416011');
  },
};

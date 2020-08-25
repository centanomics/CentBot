const { isAuthorized } = require('../../utils/modAuth');

// @command     mute
// @desc        mutes a user
// @access      moderators
module.exports = {
  name: 'mute',
  description: 'mutes people',
  mod: true,
  execute: async (message, args) => {
    if (isAuthorized(message)) {
      const user = message.mentions.members.first();
      user.roles.add('601979552956416011');
    }
  },
};

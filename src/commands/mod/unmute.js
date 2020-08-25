const { isAuthorized } = require('../../utils/modAuth');

// @command     unmute
// @desc        unmutes a user
// @access      moderators
module.exports = {
  name: 'unmute',
  description: 'unmutes people',
  mod: true,
  execute: (message, args) => {
    if (isAuthorized(message, true)) {
      const user = message.mentions.members.first();
      user.roles.remove('601979552956416011');
    }
  },
};

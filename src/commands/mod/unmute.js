const isAuthorized = require('../../utils/modAuth');

// @command     unmute
// @desc        unmutes a user
// @access      moderators
module.exports = {
  name: 'unmute',
  description: 'unmutes people',
  execute: (message, args) => {
    if (isAuthorized(message)) {
      const user = message.mentions.members.first();
      user.roles.remove('601979552956416011');
    }
  },
};

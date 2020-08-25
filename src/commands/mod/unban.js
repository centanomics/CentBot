const { isAuthorized } = require('../../utils/modAuth');

// @command     unban
// @desc        unbans a user
// @access      moderators
module.exports = {
  name: 'unban',
  description: 'revokes a users ban',
  mod: true,
  execute: async (message, args) => {
    if (isAuthorized(message)) {
      await message.guild.members.unban(args[0]);
    }
  },
};

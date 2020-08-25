const { isAuthorized } = require('../../utils/modAuth');

// @command     unlock
// @desc        undo a readonly channel
// @access      all
module.exports = {
  name: 'unlock',
  description: 'undo a readonly channel',
  mod: true,
  execute: (message, args) => {
    if (isAuthorized(message, true)) {
      let everyoneRole = message.guild.roles.everyone.id;
      let overwrites = message.channel.permissionOverwrites
        .get(everyoneRole)
        .update({
          SEND_MESSAGES: true,
        });

      message.channel.send('Unlocked channel.');
    }
  },
};

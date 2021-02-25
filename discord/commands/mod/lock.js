// @command     lock
// @desc        make a channel read only
// @access      all
module.exports = {
  name: 'lock',
  description: 'make a channel read only',
  mod: true,
  execute: async (message, args) => {
    let everyoneRole = message.guild.roles.everyone.id;
    let overwrites = message.channel.permissionOverwrites
      .get(everyoneRole)
      .update({
        SEND_MESSAGES: false,
      });

    message.channel.send('Locked channel.');
  },
};

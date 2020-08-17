// @command     lock
// @desc        make a channel read only
// @access      all
module.exports = {
  name: 'lock',
  description: 'make a channel read only',
  execute: async (message, args) => {
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      message.reply("You don't have permission to use this command!");
    } else {
      let everyoneRole = message.guild.roles.everyone.id;
      let overwrites = message.channel.permissionOverwrites.filter(
        (overwrite) => overwrite.id === everyoneRole
      );
      console.log(overwrites.deny);

      message.channel.send('Locked channel.');
    }
  },
};

const Discord = require('discord.js');

// @command     modhelp
// @desc        shows mod commands to mods
// @access      mod
module.exports = {
  name: 'modhelp',
  description: 'This makes the bot reply pong!',
  mod: true,
  execute: async (message, args) => {
    let helpCommands = new Discord.MessageEmbed().setTitle('Penny Mod Help');
    message.client.commands
      .filter((command) => {
        // return !isMod ? command.mod === false : command;
        return command.mod ? command : null;
      })
      .map((command) => {
        const commandName =
          command.name[0].toUpperCase() + command.name.slice(1);
        helpCommands.addField(`${commandName}:`, command.description);
      });

    message.channel.send({ embed: helpCommands });
  },
};

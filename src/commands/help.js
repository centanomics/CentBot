const Discord = require('discord.js');
const { isAuthorized } = require('../utils/modAuth');

// @command     help
// @desc        shows commands that you can use
// @access      all
module.exports = {
  name: 'help',
  description: 'Shows a list of commands',
  mod: false,
  execute: async (message, args) => {
    const isMod = isAuthorized(message, false);
    let helpCommands = new Discord.MessageEmbed().setTitle('Penny Help');
    message.client.commands
      .filter((command) => {
        return !isMod ? command.mod === false : command;
      })
      .map((command) => {
        const commandName =
          command.name[0].toUpperCase() + command.name.slice(1);
        helpCommands.addField(`${commandName}:`, command.description);
      });

    message.channel.send({ embed: helpCommands });
  },
};

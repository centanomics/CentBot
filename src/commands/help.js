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
    let helpCommands = new Discord.MessageEmbed().setTitle('List of Commands');
    message.client.commands.map((command) => {
      const commandName = command.name[0].toUpperCase() + command.name.slice(1);
      if (command.mod === isMod) {
        helpCommands.addField(`${commandName}:`, command.description);
      }
    });

    message.channel.send({ embed: helpCommands });
  },
};

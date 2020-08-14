const Discord = require('discord.js');

// @command     help
// @desc        shows commands that you can use
// @access      all
module.exports = {
  name: 'help',
  description: 'Shows a list of commands',
  execute: async (message, args) => {
    let helpCommands = new Discord.MessageEmbed().setTitle('List of Commands');
    message.client.commands.map((command) => {
      const commandName = command.name[0].toUpperCase() + command.name.slice(1);
      helpCommands.addField(`${commandName}:`, command.description);
    });
    message.channel.send({ embed: helpCommands });
  },
};

const Discord = require('discord.js');

// @command     help
// @desc        shows commands that you can use
// @access      all
module.exports = {
  name: 'help',
  description: 'Shows a list of commands',
  delay: 0,
  mod: false,
  execute: async (message, args) => {
    let helpCommands = new Discord.MessageEmbed().setTitle('Penny Help');
    // message.client.commands
    //   .filter((command) => {
    //     return !command.mod ? command : null;
    //   })
    //   .map((command) => {
    //     const commandName =
    //       command.name[0].toUpperCase() + command.name.slice(1);
    //     helpCommands.addField(`${commandName}:`, command.description);
    //   });

    let commands = message.client.commands.filter((command) => {
      return !command.mod ? command : null;
    })
    commands.map((command) => {
      const commandName =
        command.name[0].toUpperCase() + command.name.slice(1);
      helpCommands.addField(`${commandName}:`, command.description);
    })

    message.channel.send({ embed: helpCommands });
  },
};

require('dotenv').config()
const { toDE, toEN } = require('../../utils/translator');
const { checkLength } = require('../../utils/chars');
const { isAuthorized } = require('../../utils/modAuth');
const prefix = '$';

module.exports = (client, message) => {
  // checks if the message had the prefix or from itself
  if (!message.content.startsWith(prefix) && !message.author.bot) {
    //english
    if (message.channel.id === '521497382572130304') {
      toDE(message);
      //german
    } else if (message.channel.id === '748757584005038201') {
      toEN(message);
    }
    return;
  }
  
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  };

  // gets the command file and runs the execute function
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    if (client.commands.get(command).mod) {
      if (isAuthorized(message, true)) {
        client.commands.get(command).execute(message, args);
      }
    } else {
      client.commands.get(command).execute(message, args);
    }
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};

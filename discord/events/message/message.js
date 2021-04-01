require('dotenv').config()
// const { toDE, toEN } = require('../../utils/translator');
const { isAuthorized } = require('../../utils/modAuth');
const prefix = '$';

const usedCommandRecently = new Set();

module.exports = (client, message) => {
  // checks if the message had the prefix or from itself
  if (!message.content.startsWith(prefix) && !message.author.bot) {
    // checks to see if message is a command
    if (message.content.charAt(0) === '!' || message.content === 'b!birb') {
      return
    }

    
    // if (message.channel.id === '521497382572130304') {
    //   toDE(message);
      
    // } else if (message.channel.id === '748757584005038201') {
    //   toEN(message);
    // }
    return;
  }
  
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  };

  //catches messages with just dollar values in them
  const regex = /([0-9])+\.?([0-9])+/g;
  if (message.content.slice(prefix.length).match(regex) !== null) {
    return
  }

  // gets the command file and runs the execute function
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    if (!usedCommandRecently.has(command + message.author.id)) {
      if (client.commands.get(command).mod) {
        if (isAuthorized(message, true)) {
          client.commands.get(command).execute(message, args);
          usedCommandRecently.add(command + message.author.id);
          setTimeout(() => {
            usedCommandRecently.delete(command + message.author.id)
          }, client.commands.get(command).delay)
        }
      } else {
        client.commands.get(command).execute(message, args);
        usedCommandRecently.add(command + message.author.id);
        setTimeout(() => {
          usedCommandRecently.delete(command + message.author.id)
        }, client.commands.get(command).delay)
      }
    } else {
      message.channel.send('you gotta wait man')
    }
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};

require('dotenv').config();
const { isAuthorized } = require('../../utils/modAuth');
const prefix = '$';

const usedCommandRecently = new Set();

const delay = (wentThrough, command, authorId, client) => {
  if (wentThrough) {
    usedCommandRecently.add(command + authorId);
    setTimeout(() => {
      usedCommandRecently.delete(command + authorId);
    }, client.commands.get(command).delay);
  }
};

module.exports = async (client, message) => {
  // checks if the message had the prefix or from itself
  if (!message.content.startsWith(prefix) && !message.author.bot) {
    // checks to see if message is a command
    if (message.content.charAt(0) === '!' || message.content === 'b!birb') {
      return;
    }
    return;
  }

  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  //catches messages with just dollar values in them
  // const regex = /([0-9])+\.?([0-9])+/g;
  // if (message.content.slice(prefix.length).match(regex) !== null) {
  //   return;
  // }

  // gets the command file and runs the execute function
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    if (!usedCommandRecently.has(command + message.author.id)) {
      if (client.commands.get(command).mod) {
        if (isAuthorized(message, true)) {
          const ver = await client.commands.get(command).execute(message, args);
          delay(ver, command, message.author.id, client);
        }
      } else {
        const ver = await client.commands.get(command).execute(message, args);
        delay(ver, command, message.author.id, client);
      }
    } else {
      message.channel.send(
        `You have to wait ${
          client.commands.get(command).delay * 0.001
        } seconds from the last use of this command to use it again.`
      );
    }
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};

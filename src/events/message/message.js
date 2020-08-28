const { toDE, toEN } = require('../../utils/translator');
const prefix = process.env.PREFIX;

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
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // gets the command file and runs the execute function
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    client.commands.get(command).execute(message, args);
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};

const prefix = process.env.PREFIX;

module.exports = (client, message) => {
  // checks if the message had the prefix or from itself
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

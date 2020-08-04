const prefix = process.env.PREFIX;

module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    client.commands.get(command).execute(message, args);
  } else {
    message.channel.send(`${command} command does not exist`);
  }
};

const prefix = process.env.PREFIX;

module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  client.commands.get(command).execute(message, args);
};

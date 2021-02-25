const prefix = '$';

module.exports = (client, channel, userstate, msg, self) => {
  if (self || !msg.startsWith(prefix)) return;

  // gets the command file and runs the execute function
  const args = msg.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (client.commands.get(command)) {
    if (client.commands.get(command).mod) {
      if (isAuthorized(msg, true)) {
        client.commands.get(command).execute(client, channel, msg, args);
      }
    } else {
      client.commands.get(command).execute(client, channel, msg, args);
    }
  } else {
    // if the command doesn't exist, notify the user
    client.say(channel, `${command} command does not exist`);
  }
};
module.exports = (client, channel, userstate, msg, self) => {
  if (self) return;

  console.log(channel, '\n\n', userstate, '\n\n', msg, '\n\n', self)
  client.say(channel, `@${userstate['display-name']}, hello there`)
};
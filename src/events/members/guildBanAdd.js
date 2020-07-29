module.exports = async (client, guild, user) => {
  const channel = await client.channels.fetch('731129813095546982');
  channel.send(`\`${user.tag}\` was banned.\nUser Id: \`${user.id}\``);
};

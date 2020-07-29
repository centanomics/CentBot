module.exports = async (client, member) => {
  const channel = await client.channels.fetch('731129813095546982');
  channel.send(`\`${member.user.tag}\` left the server`);
};

module.exports = async (client, invite) => {
  const { code } = invite;
  console.log(invite);
  const channel = await client.channels.fetch('731129813095546982');
  channel.send(`invite tag \`${code}\` deleted`);
};

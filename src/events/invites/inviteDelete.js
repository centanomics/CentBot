const Invite = require('../../models/invites');

module.exports = async (client, invite) => {
  const { code } = invite;
  const channel = await client.channels.fetch('731129813095546982');
  try {
    await Invite.findByIdAndRemove(code);
  } catch (err) {
    console.log(err.message);
  }
  channel.send(`invite tag \`${code}\` deleted`);
};

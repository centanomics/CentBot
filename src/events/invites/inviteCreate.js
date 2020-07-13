const Invite = require('../../models/invites');

module.exports = async (client, invite) => {
  const { inviter, code, uses } = invite;
  const channel = await client.channels.fetch('731129813095546982');
  channel.send(`\`${inviter.tag}\` created an invite: \`${code}\``);

  try {
    const newInvite = new Invite({
      _id: code,
      uses: uses,
    });

    const upInvite = await newInvite.save();
  } catch (err) {
    console.log(err.message);
  }
};

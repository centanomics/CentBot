const Invite = require('../../models/invites');
const { sendLog } = require('../../utils/modAuth');

module.exports = async (client, invite) => {
  const { inviter, code, uses, guild } = invite;

  sendLog(`\`${inviter.tag}\` created an invite: \`${code}\``, guild);

  try {
    const newInvite = new Invite({
      _id: code,
      uses: uses,
      guildId: invite.channel.guild.id,
    });

    const upInvite = await newInvite.save();
  } catch (err) {
    console.log(err.message);
  }
};

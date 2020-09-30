const Invite = require('../../models/invites');
const { sendLog } = require('../../utils/modAuth');

module.exports = async (client, invite) => {
  const { code, guild } = invite;
  try {
    await Invite.findByIdAndRemove(code);
  } catch (err) {
    console.log(err.message);
  }
  sendLog(`invite tag \`${code}\` deleted`, guild);
};

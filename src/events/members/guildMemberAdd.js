const Invite = require('../../models/invites');
const Defaults = require('../../models/defaults');
const { sendLog } = require('../../utils/modAuth');

module.exports = async (client, member) => {
  const invitesArr = await member.guild.fetchInvites();
  const newInvites = Array.from(invitesArr.values());
  let code = '';
  try {
    const oldInvites = await Invite.find({});
    for (let i = 0; i < oldInvites.length; i++) {
      if (oldInvites[i].uses !== newInvites[i].uses) {
        code = oldInvites[i]._id;
        const inviteFields = {};
        inviteFields.uses = newInvites[i].uses;
        // update record in database
        await Invite.findByIdAndUpdate(
          code,
          { $set: inviteFields },
          { new: true }
        );
      }
    }
  } catch (err) {
    console.log(err.message);
  }
  sendLog(
    `\`@${member.user.tag}\` joined server with invite \`${code}\``,
    member.guild
  );

  member.guild.systemChannel.send(
    `<@${member.user.id}> has been added to the collection. Welcome!`
  );

  try {
    const defaultRole = await Defaults.findOne({ guildId: member.guild.id });
    if (defaultRole) {
      await member.roles.add(defaultRole.roleId);
    }
  } catch (err) {
    console.log(err.message);
  }
};

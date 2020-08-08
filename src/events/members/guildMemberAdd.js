const Invite = require('../../models/invites');

module.exports = async (client, member) => {
  const channel = await client.channels.fetch('731129813095546982');
  const welcome = await client.channels.fetch('482722726373752832');
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
  channel.send(`\`@${member.user.tag}\` joined server with invite \`${code}\``);
  welcome.send(
    `<@${member.user.id}> has been added to the collection. Welcome!`
  );
};

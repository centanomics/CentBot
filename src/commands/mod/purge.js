module.exports = {
  name: 'purge',
  description: 'purges a number of messages, max 100',
  execute: async (message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send("You don't have permission to use this command");
    } else {
      try {
        const n = args[0];
        await message.channel.bulkDelete(n);
        message.channel.send(`Purged ${n} message(s).`).then((message) => {
          message.delete();
        });
      } catch (err) {
        message.channel.send(err.message);
      }
    }
  },
};

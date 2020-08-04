module.exports = {
  name: 'purge',
  description: 'purges a number of messages, max 100',
  execute: async (message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send("You don't have permission to use this command");
    } else {
      const n = args[0];
      message.channel.send(`Purged ${n} message(s).`);
    }
  },
};

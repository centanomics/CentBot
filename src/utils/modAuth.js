const modAuth = {
  // checks if the user is a mod
  isAuthorized: (message, reply) => {
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      reply
        ? message.reply("You don't have permission to use this command!")
        : null;
      return false;
    } else {
      return true;
    }
  },
};

module.exports = modAuth;

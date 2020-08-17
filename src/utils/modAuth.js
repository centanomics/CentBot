module.exports = (message) => {
  if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
    message.reply("You don't have permission to use this command!");
    return false;
  } else {
    return true;
  }
};

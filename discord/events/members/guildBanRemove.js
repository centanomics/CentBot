const { sendLog } = require('../../utils/modAuth');
module.exports = async (client, guild, user) => {
  sendLog(`\`${user.tag}\` was unbanned`, guild);
};

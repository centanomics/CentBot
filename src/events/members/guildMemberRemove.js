const { sendLog } = require('../../utils/modAuth');
module.exports = async (client, member) => {
  sendLog(`\`${member.user.tag}\` left the server`, member.guild);
};

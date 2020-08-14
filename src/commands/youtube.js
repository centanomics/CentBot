// @command     youtube
// @desc        links my youtube channel
// @access      all
module.exports = {
  name: 'youtube',
  description: "sends Cent's youtube channel!",
  execute: (message, args) => {
    message.channel.send(
      'https://www.youtube.com/channel/UCsv8fXntSI4kcnZnVo2K1Qg'
    );
  },
};

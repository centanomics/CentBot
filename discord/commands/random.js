const Discord = require('discord.js');

const removeQuotes = (args) => {
  args[0] = args[0].slice(1);
  args[args.length - 1] = args[args.length - 1].slice(
    0,
    args[args.length - 1].length - 1
  );
  return args;
};

// @command     random
// @desc        chooses a random option
// @access      all
module.exports = {
  name: 'random',
  description: 'chooses a random option',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    if (args.length === 0) {
      const randomHelper = new Discord.MessageEmbed();
      randomHelper.setTitle('Random Help.');
      randomHelper.addField(
        '$bets create "[item-a]" ... "[item-z]"',
        'Chooses a random option from the options given. No limit to how many options there can be.'
      );
      message.channel.send({ embed: randomHelper });
      return;
    }
    let moreArgs = args
      .join(' ')
      .replace(/([“”])/g, '"')
      .split('" "');
    moreArgs = removeQuotes(moreArgs);

    message.channel.send(
      moreArgs[Math.floor(Math.random() * Math.floor(moreArgs.length))]
    );
  },
};

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
  mod: false,
  execute: (message, args) => {
    let moreArgs = args
      .join(' ')
      .replace(/([“”])/g, '"')
      .split('" "')
    moreArgs = removeQuotes(moreArgs);
    
    message.channel.send(moreArgs[Math.floor(Math.random() * Math.floor(moreArgs.length))]);
  },
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// @command     flip
// @desc        flips a set amount of coins.
// @access      all
module.exports = {
  name: 'flip',
  description: 'Flips a set amount of coins.',
  mod: false,
  execute: (message, args) => {
    const coins = parseInt(args[0]);
    if (coins >= 1967) {
      message.channel.send('You can only flip up to 1966 coins');
      return;
    }
    let results = '';
    for (let i = 0; i < coins; i++) {
      const flip = getRandomInt(2);
      if (flip === 0) {
        results += 'H';
      } else if (flip === 1) {
        results += 'T';
      }
    }

    message.channel.send(`Results of the ${coins} coin flip(s): ${results}`);
  },
};

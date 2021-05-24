const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// @command     flip
// @desc        flips a set amount of coins.
// @access      all
module.exports = {
  name: 'flip',
  description: 'Flips a set amount of coins.',
  delay: 5000,
  mod: false,
  execute: (message, args) => {
    const coins = parseInt(args[0]);
    if (args.length === 0) {
      message.channel.send('Choose how many coins to flip.');
      return false;
    }
    // console.log(coins, args);
    if (coins >= 1967 || coins < 1) {
      message.channel.send('You can only flip between 1 and 1967 coins');
      return false;
    }
    let results = '';
    let counts = [0, 0];
    for (let i = 0; i < coins; i++) {
      const flip = getRandomInt(2);
      if (flip === 0) {
        results += 'H';
        counts[0]++;
      } else if (flip === 1) {
        results += 'T';
        counts[1]++;
      }
    }

    message.channel.send(`Results of the ${coins} coin flip(s): ${results}`);
    message.channel.send(`Heads: ${counts[0]}\nTails: ${counts[1]}`);
    return true;
  },
};

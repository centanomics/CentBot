const Bets = require('../models/bets');
let client;
let user;

const getBetOptions = (options) => {
  client.on('message', (message) => {
    if (message.author === user) {
      if (message.content === 'done') {
        return message.channel.send(' ');
      } else if (message.content === 'cancel') {
        return message.channel.send('Cancelled creation of bet.');
      } else {
        message.channel.send('added option');
        options.push(message.content);
      }
    }
    return;
  });
};

const createBet = (message, args) => {
  console.log(args);
  message.channel.send(
    "Add your options one at a time and type 'done' when you're done (must have at least 2 options)"
  );
  const newBet = new Bets({
    name: args[0],
  });
  const options = getBetOptions([]);
};
const showBets = () => {};
const deleteBet = () => {};
const closeBet = () => {};

module.exports = {
  name: 'bets',
  description: 'manage bets',
  execute: (message, args) => {
    client = message.client;
    user = message.author;

    if (!args[0])
      return message.reply(
        '\nBets options:\n' +
          '$bets create [bet name]\n' +
          '$bets show - shows your bets\n' +
          '$bet delete - deletes a bet\n' +
          '$bet close - closes a bet`'
      );

    switch (args[0]) {
      case 'create':
        createBet(message, args.slice(1, args.length).join(' '));
      case 'show':
        showBets();
      case 'delete':
        deleteBet();
      case 'close':
        closeBet();
    }
  },
};

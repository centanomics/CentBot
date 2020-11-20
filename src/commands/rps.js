const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const options = ['rock', 'paper', 'scissors', 'rock'];

// @command     rps
// @desc        rock paper scissors
// @access      all
module.exports = {
  name: 'rps',
  description: 'rock paper scissors',
  mod: false,
  execute: (message, args) => {
    const botChoice = options[getRandomInt(3) + 1];
    const userChoice = args[0].toLowerCase();
    if (options.indexOf(userChoice) === -1) {
      message.channel.send('You gotta choose rock, paper, or scissors man');
      return
    }
    message.channel.send(
      `${message.author.username}: ${userChoice}\nPenny: ${botChoice}`
    );
    if (botChoice === userChoice) {
      message.channel.send('You tied!')
    } else {
      if (botChoice === 'rock') {
        if (userChoice === 'paper') {
          message.channel.send('You win!')
        } else {
          message.channel.send('The bot wins!')
        }
      }
      if (botChoice === 'paper') {
        if (userChoice === 'scissors') {
          message.channel.send('You win!')
        } else {
          message.channel.send('The bot wins!')
        }
      }
      if (botChoice === 'scissors') {
        if (userChoice === 'rock') {
          message.channel.send('You win!')
        } else {
          message.channel.send('The bot wins!')
        }
      }
    }
  },
};

// rock > paper
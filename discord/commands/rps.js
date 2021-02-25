const uuid = require('uuid');
const Rps = require('../models/rps');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const options = ['rock', 'paper', 'scissors', 'rock'];

const getUser = async (guildId, userId) => {
  const user = await Rps.findOne({ guildId: guildId, userId: userId });
  if (user) {
    return user;
  }
  const newUser = new Rps({
    _id: uuid.v4(),
    guildId: guildId,
    userId: userId,
  })
  const upUser = await newUser.save();
  return upUser;
}

// @command     rps
// @desc        rock paper scissors
// @access      all
module.exports = {
  name: 'rps',
  description: 'rock paper scissors',
  mod: false,
  execute: async (message, args) => {
    const botChoice = options[getRandomInt(3) + 1];
    const userChoice = args[0].toLowerCase();
    if (options.indexOf(userChoice) === -1) {
      message.channel.send('You gotta choose rock, paper, or scissors man');
      return
    }
    const userScore = await getUser(message.guild.id, message.author.id);
    message.channel.send(
      `${message.author.username}: ${userChoice}\nPenny: ${botChoice}`
    );
    if (botChoice === userChoice) {
      message.channel.send('You tied!')
    } else {
      if (botChoice === 'rock') {
        if (userChoice === 'paper') {
          userScore.userWin++;
          message.channel.send('You win!')
        } else {
          userScore.botWin++;
          message.channel.send('The bot wins!')
        }
      }
      if (botChoice === 'paper') {
        if (userChoice === 'scissors') {
          userScore.userWin++;
          message.channel.send('You win!')
        } else {
          userScore.botWin++;
          message.channel.send('The bot wins!')
        }
      }
      if (botChoice === 'scissors') {
        if (userChoice === 'rock') {
          userScore.userWin++;
          message.channel.send('You win!')
        } else {
          userScore.botWin++;
          message.channel.send('The bot wins!')
        }
      }
    }
    message.channel.send(
      `Your wins: ${userScore.userWin}\nBot Wins: ${userScore.botWin}`
    );
    const userFields = {
      botWin: userScore.botWin,
      userWin: userScore.userWin
    };
    await Rps.findByIdAndUpdate(
      userScore._id,
      { $set: userFields },
      { new: true }
    )
  },
};

// rock > paper
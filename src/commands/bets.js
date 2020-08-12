const Discord = require('discord.js');
const uuid = require('uuid');

const Bets = require('../models/bets');
const e = require('express');

const createBetEmbed = async (client, args) => {
  let rtnString = '';
  rtnString += args[0];
  rtnString += '\n';
  for (let i = 1; i < args.length; i++) {
    rtnString += `${i}. ${args[i]}\n`;
  }
  const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  const channel = await client.channels.fetch('619701986614312961');
  const betMessage = await channel.send(rtnString);
  for (let i = 0; i < args.length - 1; i++) {
    await betMessage.react(numberEmotes[i]);
  }
  return betMessage.id;
};

const createBet = async (message, args) => {
  try {
    if (args.slice(1).length < 2) {
      throw { message: 'You must have at least 2 options' };
    } else if (args.slice(1).length > 9) {
      throw { message: "You can't have more than 9 options" };
    }
    const betMessageId = await createBetEmbed(message.client, args);
    const newBet = new Bets({
      _id: uuid.v4(),
      name: args[0],
      options: args.slice(1).toString(),
      closed: false,
      correct: '',
      userId: message.author.id,
      messageId: betMessageId,
    });

    const upInvite = await newBet.save();
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};
const showBets = async (message, args) => {
  try {
    const createdBets = await Bets.find({
      userId: message.author.id,
    });
    if (createdBets.length === 0) {
      message.channel.send("You haven't created any bets yet!");
      return;
    }
    let rtnString = 'Your bets:\n';
    for (let i = 0; i < createdBets.length; i++) {
      rtnString += `${i + 1}. ${createdBets[i].name}\n`;
    }
    message.channel.send(rtnString);
  } catch (err) {
    console.log(err.message);
  }
};

const closeBet = (message, args) => {
  message.channel.send('close');
};

const deleteBet = async (message, args) => {
  try {
    const createdBets = await Bets.find({
      userId: message.author.id,
    });
    if (createdBets.length === 0) {
      message.channel.send("You haven't created any bets to delete!");
      return;
    }
    const betToDelete = createdBets[parseInt(args) - 1];
    const channel = await message.client.channels.fetch('619701986614312961');
    const messageToDelete = await channel.messages.fetch(betToDelete.messageId);
    await messageToDelete.delete();
    await Bets.findByIdAndRemove(betToDelete._id);
    message.channel.send('Bet deleted!');
  } catch (err) {
    console.log(err.message);
  }
};

const betHelp = (message, args) => {
  const betHelper = new Discord.MessageEmbed();
  betHelper.setTitle('Bet Help.');
  betHelper.addField(
    '$bets create "[title]" "[option1]" "[option2]"',
    'creates a bet with a title and 2-9 options'
  );
  betHelper.addField('$bets show', 'Shows your created bets');
  betHelper.addField(
    '$bets close [number]',
    'Closes a bet and shows the correct option'
  );
  message.channel.send({ embed: betHelper });
};

const removeQuotes = (args) => {
  args[0] = args[0].slice(1);
  args[args.length - 1] = args[args.length - 1].slice(
    0,
    args[args.length - 1].length - 1
  );
  return args;
};

module.exports = {
  name: 'bets',
  description: 'manage bets',
  execute: (message, args) => {
    let moreArgs = args
      .slice(1)
      .join(' ')
      .replace(/([“”])/g, '"')
      .split('" "');
    moreArgs = removeQuotes(moreArgs);
    switch (args[0]) {
      case 'create':
        createBet(message, moreArgs);
        return;
      case 'show':
        showBets(message, args);
        return;
      case 'delete':
        deleteBet(message, args.slice(1).join(''));
        return;
      case 'close':
        closeBet(message, args);
        return;
      default:
        betHelp(message, args[0]);
        return;
    }
  },
};

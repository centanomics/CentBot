const Discord = require('discord.js');
const uuid = require('uuid');

const Bets = require('../models/bets');

const createBetEmbed = async (client, args) => {
  let rtnString = '';
  rtnString += args[0];
  rtnString += '\n';
  for (let i = 1; i < args.length; i++) {
    rtnString += `${i}. ${args[i]}\n`;
  }
  const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  const channel = await client.channels.fetch('619701986614312961');
  channel.send(rtnString).then((message) => {
    for (let i = 0; i < args.length - 1; i++) {
      message.react(numberEmotes[i]);
    }
  });
};

const createBet = async (message, args) => {
  try {
    console.log(args.slice(1).toString());
    const newBet = new Bets({
      _id: uuid.v4(),
      name: args[0],
      options: args.slice(1).toString(),
      closed: false,
      correct: '',
      userId: message.author.id,
    });

    const upInvite = await newBet.save();
    createBetEmbed(message.client, args);
  } catch (err) {
    console.log(err.message);
  }
};
const showBets = (message, args) => {
  message.channel.send('show');
};
const closeBet = (message, args) => {
  message.channel.send('close');
};

const betHelp = (message, args) => {
  const betHelper = new Discord.MessageEmbed();
  betHelper.setTitle('Bet Help.');
  betHelper.addField(
    '$bets create "[title]" "[option1]" "[option2]"',
    'creates a bet'
  );
  betHelper.addField('$bets show', 'Shows your created bets');
  betHelper.addField('$bets delete [id]', 'Deletes a bet by id');
  message.channel.send({ embed: betHelper });
};

module.exports = {
  name: 'bets',
  description: 'manage bets',
  execute: (message, args) => {
    const regex = /([“”])/g;
    console.log(args);
    const moreArgs = args.slice(1).join(' ').replace(regex, '"').split('" "');

    moreArgs[0] = moreArgs[0].slice(1);
    moreArgs[moreArgs.length - 1] = moreArgs[moreArgs.length - 1].slice(
      0,
      moreArgs[moreArgs.length - 1].length - 1
    );
    // FIX ABOVE LINE LMAO

    switch (args[0]) {
      case 'create':
        createBet(message, moreArgs);
        return;
      case 'show':
        showBets(message, moreArgs);
        return;
      case 'close':
        closeBet(message, moreArgs);
        return;
      default:
        betHelp(message, args[0]);
        return;
    }
  },
};

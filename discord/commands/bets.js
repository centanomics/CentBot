const Discord = require('discord.js');
const uuid = require('uuid');

const Bets = require('../models/bets');
const Channels = require('../models/channels');

// so i dont have to keep copying and pasting the bet channel id
let betChannel = null;

// creates a message to be sent in the bets channel
const createBetEmbed = async (client, args) => {
  let rtnString = '';
  rtnString += args[0];
  rtnString += '\n';
  for (let i = 1; i < args.length; i++) {
    rtnString += `${i}. ${args[i]}\n`;
  }
  rtnString += '-----\n';
  rtnString += 'Bet Status: OPEN';
  const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  // const channel = await client.channels.fetch('619701986614312961');
  const betMessage = await betChannel.send(rtnString);
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
      guildId: message.guild.id,
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
      guildId: message.guild.id,
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

const closeBet = async (message, args) => {
  try {
    const createdBets = await Bets.find({
      userId: message.author.id,
      guildId: message.guild.id,
    });
    let betToClose = createdBets[parseInt(args[0]) - 1];
    if (createdBets.length === 0) {
      message.channel.send("You haven't created any bets to close!");
      return;
    } else if (betToClose.closed) {
      message.channel.send("You can't close a bet that's already closed!");
      return;
    }
    // const channel = await message.client.channels.fetch('619701986614312961');

    const messageToEdit = await betChannel.messages.fetch(betToClose.messageId);
    const options = betToClose.options.split(',');
    let msgContent = messageToEdit.content.split('\n');
    msgContent[msgContent.length - 1] = `Bet Status: CLOSED | Correct Option: ${
      args[1]
    }. ${options[args[1] - 1]}`;
    await messageToEdit.edit(msgContent.join('\n'));

    const betFields = {
      closed: true,
      correct: parseInt(args[1]),
    };
    betToClose = await Bets.findByIdAndUpdate(
      betToClose._id,
      { $set: betFields },
      { new: true }
    );
    message.channel.send(`Closed the ${betToClose.name} bet!`);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteBet = async (message, args) => {
  try {
    const createdBets = await Bets.find({
      userId: message.author.id,
      guildId: message.guild.id,
    });
    if (createdBets.length === 0) {
      message.channel.send("You haven't created any bets to delete!");
      return;
    }
    const betToDelete = createdBets[parseInt(args) - 1];
    // const channel = await message.client.channels.fetch('619701986614312961');
    const messageToDelete = await betChannel.messages.fetch(
      betToDelete.messageId
    );
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
    '$bets close [number] [correct option]',
    'Closes a bet and shows the correct option'
  );
  betHelper.addField('$bets delete [number]', 'Deletes a bet you created$');
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

// @command     bets
// @desc        create, close, and delete bets
// @access      all
module.exports = {
  name: 'bets',
  description: 'manage bets',
  delay: 0,
  mod: false,
  execute: async (message, args) => {
    // checks to see if a bets channel exist for this server
    // and sets it to the global betChannel variable
    // if one doesn't, it creates one
    const betsChannels = await Channels.find({
      name: 'bets',
      guildId: message.guild.id,
    });

    if (betsChannels.length === 0) {
      const newChannel = await message.guild.channels.create('bets', {
        type: 'text',
        topic: 'Your bets will appear here!',
        position: 1000,
        permissionOverwrites: [
          { id: message.guild.roles.everyone.id, deny: ['SEND_MESSAGES'] },
        ],
      });

      const newBetChannel = new Channels({
        name: newChannel.name,
        channelId: newChannel.id,
        guildId: newChannel.guild.id,
      });
      await newBetChannel.save();

      betChannel = newChannel;
    } else {
      betChannel = message.guild.channels.resolve(betsChannels[0].channelId);
    }

    // changes smart double quotes to regular double quotes
    // and then removes them for each argument
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
        closeBet(message, args.slice(1));
        return;
      default:
        betHelp(message, args[0]);
        return;
    }
  },
};

const uuidv4 = require('uuid');
const Sus = require('../models/sus');
const tiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

const showSusList = async (message) => {
  try {
    const suses = await Sus.find({ guildId: message.guild.id });
    let output = 'Sus Tier List';
    for (let i = 0; i < tiers.length; i++) {
      output += '\n\n';
      output += `${tiers[i]}: `;
      const thisTier = suses.filter(sus => sus.rating === tiers[i]);
      for (let j = 0; j < thisTier.length; j++) {
        const member = message.guild.member(thisTier[j].userId);
        if (member.nickname === null) {
          output += `${member.user.username}, `;
        } else {
          output += `${member.nickname}, `;
        }
      }
    }
    message.channel.send(output);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
}

const addToSusList = async (message, args) => {
  console.log(args)
  try {
    if (tiers.indexOf(args[1].toUpperCase()) === -1) {
      throw {message: 'You need to enter a proper tier. (S, A, B, C, D, E, or F)'}
    }

    const user = message.mentions.members.first();
    const susPerson = await Sus.findOne({guildId: message.guild.id, userId: user.user.id})
    if (susPerson) {
      throw { message: 'This idiot is already on this sus list!' }
    }

    const newSus = new Sus({
      _id: uuidv4.v4(),
      guildId: message.guild.id,
      userId: user.user.id,
      rating: args[1].toUpperCase(),
    });

    await newSus.save();
    message.channel.send(`Added ${user.nickname} to ${newSus.rating} tier!`);

  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
}

// @command     sus
// @desc        sus tierlist stuff
// @access      all
module.exports = {
  name: 'ping',
  description: 'sus tierlist stuff',
  mod: false,
  execute: (message, args) => {
    switch (args[0]) {
      case 'show':
        showSusList(message);
        return;
      default:
        addToSusList(message, args);
        return;
    }
  },
};

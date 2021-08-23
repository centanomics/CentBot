const Discord = require('discord.js');
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
      const thisTier = suses.filter((sus) => sus.rating === tiers[i]);
      for (let j = 0; j < thisTier.length; j++) {
        const member = await message.guild.members.fetch(thisTier[j].userId);
        if (member.nickname === null) {
          output += `${member.user.username}, `;
        } else {
          output += `${member.nickname}, `;
        }
        // output += `${member.nickname}, `;
      }
    }

    message.channel.send(output);
  } catch (err) {
    console.log(err);
    message.channel.send(err.message);
  }
};

const removeSus = async (message, args) => {
  try {
    const user = message.mentions.members.first();
    const susToDelete = await Sus.findOne({
      guildId: message.guild.id,
      userId: user.user.id,
    });
    if (!susToDelete) {
      throw { message: "You can't remove a user not on the sus list" };
    }

    susToDelete.remove();
    // await Sus.findOneAndRemove(susToDelete._id);
    message.channel.send(`Removed ${user.nickname} from sus list!`);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

const addToSusList = async (message, args) => {
  try {
    // helper for when no arguments are put in
    if (args.length === 0) {
      const susHelper = new Discord.MessageEmbed();
      susHelper.setTitle('Random Help.');
      susHelper.addField(
        '$sus [@user] [S-F rating]',
        "Adds a user to the sus list if they're not on it, updated their rating if the user is on the list already"
      );
      susHelper.addField('$sus show', 'Shows the sus list.');
      susHelper.addField('$sus remove', 'Removes a user from the sus list');
      message.channel.send({ embed: susHelper });
      return;
    }

    // checks to see if a valid rating was given
    if (tiers.indexOf(args[1].toUpperCase()) === -1) {
      throw {
        message: 'You need to enter a proper tier. (S, A, B, C, D, E, or F)',
      };
    }

    const user = message.mentions.members.first();
    const newSus = new Sus({
      _id: uuidv4.v4(),
      guildId: message.guild.id,
      userId: user.user.id,
      rating: args[1].toUpperCase(),
    });

    let susPerson = await Sus.findOne({
      guildId: message.guild.id,
      userId: user.user.id,
    });
    if (susPerson) {
      const susFields = {
        rating: args[1].toUpperCase(),
      };
      susPerson = await Sus.findByIdAndUpdate(
        susPerson._id,
        { $set: susFields },
        { new: true }
      );
      message.channel.send(
        `Updated ${user.nickname} to ${susFields.rating} tier!`
      );
      return;
    }

    await newSus.save();
    message.channel.send(`Added ${user.nickname} to ${newSus.rating} tier!`);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

// @command     sus
// @desc        sus tierlist stuff
// @access      all
module.exports = {
  name: 'sus',
  description: 'sus tierlist stuff',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    console.log(args[0]);
    switch (args[0]) {
      case 'show':
        showSusList(message);
        return;
      case 'remove':
        removeSus(message, args);
        return;
      default:
        console.log(args);
        // addToSusList(message, args);
        return;
    }
  },
};

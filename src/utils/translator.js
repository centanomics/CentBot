const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');
const message = require('../events/message/message');

const translator = {
  // checks if the user is a mod
  toDE: async (message) => {
    const channel = await message.client.channels.fetch('748757584005038201');
    const reply = await translate(message.content, { from: 'en', to: 'de' });
    const msgEmbed = new Discord.MessageEmbed();
    msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
    msgEmbed.setDescription(reply.text);
    channel.send({ embed: msgEmbed });
  },
  toEN: async (message) => {
    const channel = await message.client.channels.fetch('521497382572130304');
    const reply = await translate(message.content, { from: 'de', to: 'en' });
    const msgEmbed = new Discord.MessageEmbed();
    msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
    msgEmbed.setDescription(reply.text);
    channel.send({ embed: msgEmbed });
  },
};

module.exports = translator;

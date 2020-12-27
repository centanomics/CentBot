const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');

const translator = {
  toDE: async (message) => {
    try {
      const channel = await message.client.channels.fetch('748757584005038201');
      const reply = await translate(message.content, { to: 'de' });
      const msgEmbed = new Discord.MessageEmbed();
      msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
      msgEmbed.setDescription(reply.text);
      channel.send({ embed: msgEmbed });
    } catch (err) {
      console.log(err.message);
    }
  },
  toEN: async (message) => {
    try {
      const channel = await message.client.channels.fetch('521497382572130304');
      const reply = await translate(message.content, { to: 'en' });
      const msgEmbed = new Discord.MessageEmbed();
      msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
      msgEmbed.setDescription(reply.text);
      channel.send({ embed: msgEmbed });
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = translator;

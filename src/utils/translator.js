const translateAPI = require('@vitalets/google-translate-api');
const {Translate} = require('@google-cloud/translate').v2;
const Discord = require('discord.js');

// const CREDENTIALS = require('../config/private_key');
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
// CREDENTIALS.private_key.replace(/\\n/gm, '\n');
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const translator = {
  toDE: async (message) => {
    const channel = await message.client.channels.fetch('748757584005038201');
    console.log(JSON.stringify(CREDENTIALS));
    try {
      
      let [translations] = await translate.translate(message.content, 'de');

      const msgEmbed = new Discord.MessageEmbed();
      msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
      msgEmbed.setDescription(translations);
      channel.send({ embed: msgEmbed });

    } catch (err) {
      console.log(err);
      channel.send(err.message)
    }
  },
  toEN: async (message) => {
    try {
      const channel = await message.client.channels.fetch('521497382572130304');
      let [translations] = await translate.translate(message.content, 'en');

      const msgEmbed = new Discord.MessageEmbed();
      msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
      msgEmbed.setDescription(translations);
      channel.send({ embed: msgEmbed });
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = translator;

const translateAPI = require('@vitalets/google-translate-api');
const {Translate} = require('@google-cloud/translate').v2;
const Discord = require('discord.js');

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const translator = {
  toDE: async (message) => {
    const channel = await message.client.channels.fetch('748757584005038201');
    try {
      // const channel = await message.client.channels.fetch('748757584005038201');
      // const reply = await translateAPI(message.content, { to: 'de' });
      // console.log(reply);
      // const msgEmbed = new Discord.MessageEmbed();
      // msgEmbed.setAuthor(message.author.username, message.author.avatarURL());
      // msgEmbed.setDescription(reply.text);
      // channel.send({ embed: msgEmbed });
      // console.log(CREDENTIALS.client_email)
      
      let [translations] = await translate.translate(message.conent, 'de');
      translations = Array.isArray(translations) ? translations : [translations];
      console.log('Translations:');
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
      });

    } catch (err) {
      console.log(err);
      channel.send(err.message)
    }
  },
  toEN: async (message) => {
    try {
      const channel = await message.client.channels.fetch('521497382572130304');
      const reply = await translateAPI(message.content, { to: 'en' });
      console.log(reply);
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

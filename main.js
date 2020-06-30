require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '$';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands/message')
  .filter((files) => files.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/message/${file}`);

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Penny is online!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // if (command === 'ping') {
  //   client.commands.get('ping').execute(message, args);
  // } else if (command === 'youtube') {
  //   client.commands.get('youtube').execute(message, args);
  // }
  client.commands.get(command).execute(message, args);
});

// last line
client.login(process.env.DISCORD_BOT_TOKEN);

require('dotenv').config();
const Discord = require('discord.js');
const connectDB = require('./config/db');

const client = new Discord.Client();

connectDB();

const prefix = '$';

const fs = require('fs');
const { connect } = require('http2');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands/')
  .filter((files) => files.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Penny is online!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  client.commands.get(command).execute(message, args);
});

// last line
client.login(process.env.DISCORD_BOT_TOKEN);

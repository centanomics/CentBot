//setups .env files with tokens and gets startup for database
require('dotenv').config();
const Discord = require('discord.js');
const connectDB = require('./config/db');

const client = new Discord.Client();

// connects to database
connectDB();

const prefix = process.env.PREFIX;

const fs = require('fs').promises;
const path = require('path');

// login
client.login(process.env.DISCORD_BOT_TOKEN);

// client.commands = new Map();

client.commands = new Discord.Collection();

// const commandFiles = fs
//   .readdirSync('./commands/')
//   .filter((files) => files.endsWith('.js'));

// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);

//   client.commands.set(command.name, command);
// }

client.once('ready', () => {
  console.log('Penny is online!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  client.commands.get(command).execute(message, args);
});

(async function registerCommands(dir = 'commands') {
  // read directory file
  let files = await fs.readdir(path.join(__dirname, dir));

  // loop through each file
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerCommands(path.join(dir, file));
    } else {
      if (file.endsWith('.js')) {
        let cmdName = file.substring(0, file.indexOf('.js'));
        let cmdModule = require(path.join(__dirname, dir, file));
        client.commands.set(cmdName, cmdModule);
      }
    }
  }
})();

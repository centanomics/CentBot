/* START BOT CODE */
//reminder to self to add more comments

// gets startup for database
const Discord = require('discord.js');
const connectDB = require('./config/db');

const intents = [
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_BANS',
  'GUILD_INVITES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
];
const client = new Discord.Client({
  intents: intents,
  ws: { intents: intents },
});

// connects to database
connectDB();

const fs = require('fs').promises;
const path = require('path');

// creates a collection of commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// adds all commands to a collection
(async function registerCommands(dir = 'commands') {
  // read directory file
  let files = await fs.readdir(path.join(__dirname, dir));

  // loop through each file
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerCommands(path.join(dir, file));
    } else {
      // checks if file is a js file
      if (file.endsWith('.js')) {
        let cmdName = file.substring(0, file.indexOf('.js'));
        let cmdModule = require(path.join(__dirname, dir, file));
        client.commands.set(cmdName, cmdModule);
      }
    }
  }
})();

// adds all events to the collection
(async function registerEvents(dir = 'events') {
  let files = await fs.readdir(path.join(__dirname, dir));

  // loop through each file
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerEvents(path.join(dir, file));
    } else {
      // checks if file is a js file
      if (file.endsWith('.js')) {
        let evtName = file.substring(0, file.indexOf('.js'));
        let evtModule = require(path.join(__dirname, dir, file));
        client.events.set(evtName, evtModule);

        // creates event listener for each of the event files
        client.on(evtName, evtModule.bind(null, client));
      }
    }
  }
})();

// login
client.login(process.env.DISCORD_BOT_TOKEN);

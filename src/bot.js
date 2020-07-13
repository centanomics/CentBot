//setups .env files with tokens and gets startup for database
require('dotenv').config();
const Discord = require('discord.js');
const connectDB = require('./config/db');

const client = new Discord.Client();

// connects to database
connectDB();

const fs = require('fs').promises;
const path = require('path');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

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

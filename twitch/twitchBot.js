const tmi = require('tmi.js');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
}

const client = new tmi.client(opts);

client.commands = new Map();
client.events = new Map();

const fs = require('fs').promises;
const path = require('path');

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



// client.on('message', (target, context, msg, self) => {
//   if (self) { return }
//   console.log(target, '\n\n', context, '\n\n', msg, '\n\n', self)
//   client.say(target, `@${context['display-name']}, hello there`)
// });


client.connect();

const Clubs = require('../../models/clubs');

// creates a club and a corresponding role for the server
const createClub = async (message, args) => {
  try {
    if (args.indexOf(' ') !== -1)
      throw { message: 'Your club cannot have a space in it' };

    const testClub = await Clubs.find({
      name: args,
      guildId: message.guild.id,
    });
    if (testClub.length !== 0) throw { message: 'This club already exists!' };

    const newRole = await message.guild.roles.create({
      data: { name: args, mentionable: true },
    });

    let newClub = new Clubs({
      name: args,
      roleId: newRole.id,
      guildId: message.guild.id,
    });

    await newClub.save();
    message.channel.send(`${args} club created`);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

// shows all of the clubs a server has
const showClubs = async (message) => {
  try {
    const clubs = await Clubs.find({ guildId: message.guild.id });

    if (clubs.length === 0)
      throw { message: 'There are no clubs for this server' };

    let rtnString = 'Created Clubs:\n';
    for (let i = 0; i < clubs.length; i++) {
      rtnString += `${i + 1}. ${clubs[i].name}\n`;
    }
    message.channel.send(rtnString);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

// Deletes a club
const deleteClub = async (message, args) => {
  try {
    const clubToDelete = await Clubs.find({
      name: args,
      guildId: message.guild.id,
    });
    if (clubToDelete.length === 0)
      throw { message: "You can't delete a nonexistent club!" };

    const toDelete = await message.guild.roles.fetch(clubToDelete[0].roleId);
    await toDelete.delete();

    await Clubs.findOneAndRemove(clubToDelete[0]._id);
    message.channel.send(`${args} club deleted`);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

// @command     clubs
// @desc        manages clubs for tags and stuff
// @access      all
module.exports = {
  name: 'clubs',
  description: 'Manages clubs for tags and stuff',
  mod: true,
  execute: (message, args) => {
    switch (args[0]) {
      case 'create':
        createClub(message, args.slice(1).join('-'));
        return;
      case 'show':
        showClubs(message);
        return;
      case 'delete':
        deleteClub(message, args.slice(1).join(''));
        return;
      default:
        showClubs(message);
        return;
    }
  },
};

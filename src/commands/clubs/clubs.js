const Clubs = require('../../models/clubs');

const createClub = async (message, args) => {
  try {
    if (args.indexOf(' ') !== -1)
      throw { message: 'Your club cannot have a space in it' };

    const testClub = await Clubs.find({ name: args });
    if (testClub.length !== 0) throw { message: 'This club already exists!' };

    const newRole = await message.guild.roles.create({ data: { name: args } });

    let newClub = new Clubs({
      name: args,
      roleId: newRole.id,
    });

    await newClub.save();
    message.channel.send(`${args} club created`);
  } catch (err) {
    console.log(err.message);
    message.channel.send(err.message);
  }
};

const showClubs = async (message) => {
  try {
    const clubs = await Clubs.find();

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

const deleteClub = () => {};

// @command     clubs
// @desc        manages clubs for tags and stuff
// @access      all
module.exports = {
  name: 'clubs',
  description: 'Manages clubs for tags and stuff',
  mod: false,
  execute: (message, args) => {
    switch (args[0]) {
      case 'create':
        createClub(message, args.slice(1).join('-'));
        return;
      case 'show':
        showClubs(message);
        return;
      case 'leave':
        message.channel.send('delete');
        return;
      default:
        message.channel.send('wrong keyword idiot');
        return;
    }
  },
};

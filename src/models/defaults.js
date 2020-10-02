const mongoose = require('mongoose');
const uuid = require('uuid');

const DefaultsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4(),
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('defaults', DefaultsSchema);

const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4();

const ClubsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('clubs', ClubsSchema);

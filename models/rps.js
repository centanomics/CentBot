const mongoose = require('mongoose');

const rpsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userWin: {
    type: Number,
    required: true,
    default: 0,
  },
  botWin: {
    type: Number,
    required: true,
    default: 0,
  }
})

module.exports = mongoose.model('rps', rpsSchema);
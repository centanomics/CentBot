const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4();

const BetsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: String,
    required: true,
  },
  closed: {
    type: Boolean,
    required: true,
  },
  correct: {
    type: Number,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('bets', BetsSchema);

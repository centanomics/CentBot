const mongoose = require('mongoose');

const BetsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  order: {
    type: Number,
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
});

module.exports = mongoose.model('bets', BetsSchema);

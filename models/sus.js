const mongoose = require('mongoose');

const susSchema = mongoose.Schema({
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
  rating: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: false,
  }
});

module.exports = mongoose.model('sus', susSchema);
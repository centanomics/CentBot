const mongoose = require('mongoose');
const uuid = require('uuid');

// report should have user and offending message

const ReportsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4(),
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
  messageId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('reports', ReportsSchema);

const mongoose = require('mongoose');

const InviteSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  uses: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('invites', InviteSchema);

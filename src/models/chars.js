const mongoose = require('mongoose');

const charSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  chars: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('chars', charSchema);

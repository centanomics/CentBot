const message = require('../events/message/message');

const Chars = require('../models/chars');

const chars = {
  checkLength: async (message) => {
    const chars = await Chars.find();
    const logger = chars[0];
    logger.chars += message.content.length;
    const updatedLogger = await Chars.findByIdAndUpdate(
      logger._id,
      { $set: logger },
      { new: true }
    );
  },
};

module.exports = chars;

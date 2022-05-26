const Message = require('../models/message.model');

async function logMessage(content, to, user) {
  await Message.create({
    content,
    to,
    user: user.id,
  });
}

module.exports = {
  logMessage,
};

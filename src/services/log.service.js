const Message = require('../models/message.model');

async function logMessage(content, to, user) {
    await Message.create({
        content,
        to,
        UserId: user.id,
    });
}

module.exports = {
    logMessage,
};

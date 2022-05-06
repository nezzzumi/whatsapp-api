const Message = require('../models/message.model');

async function logMessage(content, to, user) {
    Message.create({
        content,
        to,
        user,
    });
}

module.exports = {
    logMessage,
};

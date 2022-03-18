const venom = require('venom-bot');

let bot;

(async () => {
    bot = await venom.create({
        session: 'bot',
        multidevice: true,
    });
})();

async function sendText(to, content) {
    return bot.sendText(to, content);
}

module.exports = {
    sendText,
};

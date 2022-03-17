const venom = require('venom-bot');
const console = require('console');

let bot;

(async () => {
    bot = await venom.create({
        session: 'bot',
        multidevice: true,
    });
})();

async function sendText(to, content) {
    try {
        await bot.sendText(to, content);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    sendText,
};

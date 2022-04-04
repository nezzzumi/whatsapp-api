const console = require('console');
const venom = require('venom-bot');

let bot;

venom.create({
    session: 'bot',
    multidevice: true,
    browserArgs: ['--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'],
}).then((result) => {
    bot = result;
}).catch(console.error);

async function sendText(to, content) {
    return bot.sendText(to, content);
}

function isReady() {
    return bot !== undefined;
}

module.exports = {
    sendText,
    isReady,
};

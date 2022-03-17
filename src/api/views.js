const console = require('console');
const bot = require('../bot');

async function send(req, res) {
    const { to, content } = req.query;

    if (!to.startsWith('55') || to.length !== 13) {
        res.send({
            error: false,
            msg: 'Parâmetros inválidos.',
        }, 422);
    }

    console.log(to, content);
    try {
        await bot.sendText(`${to}@c.us`, content);
        res.send({
            error: false,
            msg: 'Mensagem enviada com sucesso.',
        });
    } catch (error) {
        console.error(error);

        res.send({
            error: true,
            msg: 'Não foi possível enviar a mensagem.',
        });
    }
}

module.exports = {
    send,
};

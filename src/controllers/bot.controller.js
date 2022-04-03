const bot = require('../services/bot.service');

async function send(req, res) {
    const { to, content } = req.body;

    if (!bot.isReady()) {
        return res.status(503).json({
            error: true,
            msg: 'O serviço ainda não está pronto para uso.',
        });
    }

    if ((!to || !content) || (typeof to !== 'string' || typeof content !== 'string')) {
        return res.status(400).json({
            error: true,
            msg: 'Parâmetros inválidos.',
        });
    }

    if (!to.startsWith('55') || to.length !== 13) {
        return res.status(422).json({
            error: true,
            msg: 'Parâmetros inválidos.',
        });
    }

    bot.sendText(`${to}@c.us`, content).then(() => {
        res.json({
            error: false,
            msg: 'Mensagem enviada com sucesso.',
        });
    }).catch((result) => {
        res.json({
            error: true,
            msg: 'Não foi possível enviar a mensagem.',
            result: result.text,
        });
    });

    return null;
}

module.exports = {
    send,
};

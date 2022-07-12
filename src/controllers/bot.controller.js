const jwt = require('jsonwebtoken');
const bot = require('../services/bot.service');
const authService = require('../services/auth.service');
const helpers = require('../utils/helpers.util');
const log = require('../services/log.service');

async function send(req, res) {
  const token = helpers.parseAuthorizationHeader(req.headers.authorization);
  const payload = jwt.decode(token);
  const user = await authService.getUserById(payload.id);

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

  if (!to.startsWith('55') || ![12, 13].includes(to.length)) {
    return res.status(422).json({
      error: true,
      msg: 'Número inválido.',
    });
  }

  bot.sendText(`${to}@c.us`, content).then(() => {
    res.json({
      error: false,
      msg: 'Mensagem enviada com sucesso.',
    });
    log.logMessage(content, to, user);
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

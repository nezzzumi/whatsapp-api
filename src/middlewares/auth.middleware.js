const jwt = require('jsonwebtoken');
const assert = require('assert');
const authService = require('../services/auth.service');
const { parseAuthorizationHeader } = require('../utils/helpers.util');

async function auth(req, res, next) {
    const token = parseAuthorizationHeader(req.headers.authorization);

    try {
        assert(token, 'Token é obrigatório.');
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await authService.getUserById(payload.id);

        if (!user) {
            throw Error('Usuário inexistente.');
        }

        if (!user.active) {
            return res.status(401).json({
                error: true,
                msg: 'Usuário inativo.',
            });
        }
    } catch (error) {
        return res.status(401).json({
            error: true,
            msg: 'Não autorizado.',
        });
    }

    return next();
}

module.exports = auth;

const assert = require('assert');
const jwt = require('jsonwebtoken');
const { parseAuthorizationHeader } = require('../utils/helpers.util');

function auth(req, res, next) {
    const token = parseAuthorizationHeader(req.headers.authorization);

    try {
        assert(token, 'Token é obrigatório.');
        jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return res.status(401).json({
            error: true,
            msg: 'Não autorizado.',
        });
    }

    return next();
}

module.exports = auth;

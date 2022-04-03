const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

async function post(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: true,
            msg: 'Parâmetros inválidos.',
        });
    }

    const user = await authService.login(username, password);

    if (!user) {
        return res.status(200).json({
            error: true,
            msg: 'Credenciais inválidas.',
        });
    }

    return res.json({
        error: false,
        msg: 'Login realizado com sucesso.',
        token: jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        }),
    });
}

module.exports = {
    post,
};

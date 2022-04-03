function auth(req, res, next) {
    // TODO: adicionar JWT
    const token = req.headers['x-key'];

    if (!token || token !== process.env.TOKEN) {
        return res.status(401).json({
            error: true,
            msg: 'Não autorizado.',
        });
    }

    return next();
}

module.exports = {
    authMiddleware: auth,
};

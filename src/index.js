require('dotenv/config');

const express = require('express');
const { apiRouter } = require('./api/routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    // TODO: adicionar JWT
    const { token } = req.headers;

    if (!token || token !== process.env.TOKEN) {
        return res.status(401).json({
            error: true,
            msg: 'Não autorizado.',
        });
    }

    return next();
});
app.use('/api', apiRouter);

app.listen(port);

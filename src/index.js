const fs = require('fs');
const express = require('express');
const { apiRouter } = require('./api/routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    const { token } = req.headers;

    if (!token || token !== fs.readFileSync('.token').toString().trim()) {
        return res.status(401).json({
            error: true,
            msg: 'Não autorizado.',
        });
    }

    return next();
});
app.use('/api', apiRouter);

app.listen(port);

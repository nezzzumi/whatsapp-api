const express = require('express');
const { apiRouter } = require('./api/routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port);

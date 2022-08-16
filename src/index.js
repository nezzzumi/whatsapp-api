require('dotenv/config');
require('./services/db.service');

const express = require('express');
const apiRouter = require('./routes/api.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port);

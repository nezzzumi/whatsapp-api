require('dotenv/config');

const express = require('express');
const { botRouter } = require('./routes/bot.route');
const { authMiddleware } = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;

app.use(express.json());
app.use(authMiddleware);
app.use('/api', botRouter);

app.listen(port);

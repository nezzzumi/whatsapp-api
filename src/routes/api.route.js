const express = require('express');
const authRouter = require('./auth.route');
const botRouter = require('./bot.route');

const router = express.Router();

router.use('/bot', botRouter);
router.use('/auth', authRouter);

module.exports = router;

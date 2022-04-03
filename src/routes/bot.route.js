const express = require('express');
const botController = require('../controllers/bot.controller');

const router = express.Router();

router.post('/send', botController.send);

module.exports = {
    botRouter: router,
};

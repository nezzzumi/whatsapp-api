const express = require('express');
const botController = require('../controllers/bot.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/send', botController.send);

module.exports = router;

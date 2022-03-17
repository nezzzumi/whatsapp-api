const express = require('express');
const views = require('./views');

const router = express.Router();

router.get('/send', views.send);

module.exports = {
    apiRouter: router,
};

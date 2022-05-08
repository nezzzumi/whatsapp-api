const crypto = require('crypto');
const User = require('../models/user.model');

function login(username, password) {
    const hash = crypto.createHash('sha512');
    hash.update(password, 'utf-8');

    return User.findOne({
        where: {
            username,
            password: hash.digest('hex'),
        },
    });
}

function getUserById(id) {
    return User.findByPk(id);
}

function getUserByName(username) {
    return User.findOne({
        where: {
            username,
        },
    });
}

module.exports = {
    login,
    getUserById,
    getUserByName,
};

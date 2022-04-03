const User = require('../models/user.model');

function login(username, password) {
    // TODO: adicionar hash
    return User.findOne({
        where: {
            username,
            password,
        },
    });
}

function getUserById(id) {
    return User.findByPk(id);
}

function getUserByName(name) {
    return User.findOne({
        where: {
            username: name,
        },
    });
}

module.exports = {
    login,
    getUserById,
    getUserByName,
};

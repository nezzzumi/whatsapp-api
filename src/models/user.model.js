const { DataTypes } = require('sequelize');
const sequelize = require('../services/db.service');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
});

(async () => {
    await User.sync();
})();

module.exports = User;

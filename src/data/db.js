const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database.db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    dt_created: DataTypes.DATE,
});

(async () => {
    await sequelize.sync();
})();

module.exports = {
    User,
};

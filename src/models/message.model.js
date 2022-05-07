const { DataTypes } = require('sequelize');
const sequelize = require('../services/db.service');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // todo: adicionar fk
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

(async () => {
    await Message.sync({ alter: true });
})();

module.exports = Message;

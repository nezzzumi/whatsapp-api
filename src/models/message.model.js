const { DataTypes } = require('sequelize');
const sequelize = require('../services/db.service');
const User = require('./user.model');

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
});

Message.belongsTo(User, { onDelete: 'SET NULL' });
User.hasMany(Message);

(async () => {
    await Message.sync({ alter: true });
})();

module.exports = Message;

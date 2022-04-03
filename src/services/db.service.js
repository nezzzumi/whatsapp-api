const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database.db');

(async () => {
    await sequelize.sync();
})();

module.exports = {
    sequelize,
};

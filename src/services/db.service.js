const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
});

(async () => {
    await sequelize.sync();
})();

module.exports = {
    sequelize,
};

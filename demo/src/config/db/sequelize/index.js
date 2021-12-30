var { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.SEQUELIZE_DATA_NAME, process.env.SEQUELIZE_USER_NAME, process.env.SEQUELIZE_PASSWORD, {
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    omitNull: true
});

try {
    db.authenticate();
    console.log('Connection Sequelize successfully.');
} catch (error) {
    console.error('Unable to connect Sequelize to the database:', error);
}

module.exports = db;
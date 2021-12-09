var { Sequelize } = require('sequelize');

const db = new Sequelize('dbdemo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    omitNull: true
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;
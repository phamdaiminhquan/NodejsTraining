var { Sequelize } = require('sequelize');

var db;

if(process.env.NODE_ENV){
    db = new Sequelize(process.env.SEQUELIZE_DATA_NAME, process.env.SEQUELIZE_USER_NAME, process.env.SEQUELIZE_PASSWORD, {
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
}else{
    const envTMA = require('tma-environment/src')
    db = new Sequelize(envTMA.DATA_NAME, envTMA.USER_NAME, envTMA.PASSWORD, {
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
}

module.exports = db;
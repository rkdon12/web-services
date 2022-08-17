const config = require('config.json');
const mysql = require('mysql2/promise');
const ma = require('mariadb');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = db = {};

async function initialize() {
     ///create db if it doesnt already exist
     const { host, user, password, database, port } = config.database;
     const connection = await mysql.createConnnection({ host, user, password, port});
     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

     //connect to database
     const sequelize = new Sequelize(database, user, password, {dialect: 'mariadb'});

     db.sequelize = sequelize;
     
     //init models and add them to the exported db object
     db.User = require('./users/user.model')(sequelize);

     //sync all mobels with database
     await sequelize.sync({force: true, alter: true });
}

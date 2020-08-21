const Sequelize = require('sequelize');
const dbuser = require('./dbuser.json');

const db = new Sequelize(
  'expresstodolist',
  dbuser.username,
  dbuser.password,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = db;
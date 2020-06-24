const Sequelize = require('sequelize');

const db = new Sequelize(
  'expressTodoList',
  'ayaanqui',
  require('./password'),
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = db;
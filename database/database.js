const Sequelize = require('sequelize');

const config = {
  username: 'ayaanqui',
  password: require('./password'),
  host: '127.0.0.1',
  port: '5432',
  database: 'expressTodoList'
};

const sequelize = new Sequelize(`postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`);

module.exports = sequelize;
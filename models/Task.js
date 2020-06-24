const Sequelize = require('sequelize');
const db = require('../database');

const Task = db.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Task;
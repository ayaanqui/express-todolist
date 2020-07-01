const Sequelize = require('sequelize');
const db = require('../database');
const User = require('./User');

const Task = db.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  task: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  completedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Task;
const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING(320),
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
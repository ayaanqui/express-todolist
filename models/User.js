const db = require('../database');

exports.createUserTable = () => {
  return db.query(`
      CREATE TABLE IF NOT EXISTS users(
        id       SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email    VARCHAR(320) NOT NULL
      );
    `);
};

exports.findAll = () => {
  return db.query(`SELECT * FROM users`);
};

exports.findById = id => {
  return db.query(`SELECT * FROM users WHERE id=$1`, id);
};
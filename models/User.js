const db = require('../database');

const table = 'users';

exports.createUserTable = () => {
  return db.query(`
      CREATE TABLE IF NOT EXISTS ${table}(
        id       SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email    VARCHAR(320) NOT NULL
      );
    `);
};

exports.findAll = () => {
  return db.query(`SELECT * FROM ${table}`);
};

exports.findById = id => {
  return db.query(`SELECT * FROM ${table} WHERE id=$1`, id);
};

exports.findByUsername = username => {
  return db.query(`SELECT * FROM ${table} WHERE username=$1`, username);
};

exports.findByEmail = email => {
  return db.query(`SELECT * FROM ${table} WHERE email=$1`, email);
};

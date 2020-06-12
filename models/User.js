const db = require('../database');

module.exports = class User {
  static createUserTable() {
    return db.query(`
      CREATE TABLE IF NOT EXISTS users(
        id       SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email    VARCHAR(320) NOT NULL
      );
    `);
  }
};
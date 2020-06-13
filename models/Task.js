const db = require('../database');

const table = 'tasks';

exports.createTable = () => {
  return db.query(`
      CREATE TABLE IF NOT EXISTS ${table}(
        id      SERIAL PRIMARY KEY,
        task    TEXT NOT NULL,
        userId  INT NOT NULL
      );
    `);
};
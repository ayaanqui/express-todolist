const Postgres = require('pg');

const db = new Postgres.Pool({
  user: 'ayaanqui',
  password: require('./password'),
  host: 'localhost',
  port: 5432,
  database: 'expressTodoList'
});

module.exports = db;
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

require('../../config/env');

const mysql = require('mysql');

const {
  E2E_DB_HOST,
  E2E_DB_PORT,
  E2E_DB_USERNAME,
  E2E_DB_PASSWORD,
  E2E_DB_DATABASE,
} = process.env;

const connectionConfig = {
  host: E2E_DB_HOST,
  port: E2E_DB_PORT,
  user: E2E_DB_USERNAME,
  password: E2E_DB_PASSWORD,
  database: E2E_DB_DATABASE,
};

console.log('[SEED Connect]', connectionConfig);

const con = mysql.createConnection(connectionConfig);

async function seed(table, fields, values) {
  const fieldsStr = fields.map((f) => `\`${f}\``).join(',');
  const sql = con.format(`REPLACE INTO \`${table}\` (${fieldsStr}) VALUES ?`, [values]);
  console.log(`[SEED SQL] ${sql}`);
  con.query(sql, (error) => {
    if (error) {
      console.error('Database seed seems to go wrong!');
      Promise.reject(error);
    }
    Promise.resolve();
  });
}

module.exports = seed;

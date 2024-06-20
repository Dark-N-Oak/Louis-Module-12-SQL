const { Pool } = require('pg');

const db = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'employee_tracker_db',
  password: 'your_password',
  port: 5432 // Default PostgreSQL port
});

module.exports = db;

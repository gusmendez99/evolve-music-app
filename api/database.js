const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: '1234',
  port: 5432,
})

module.exports = pool;
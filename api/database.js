const Pool = require('pg').Pool
/*
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: '1234',
  port: 5432,
})
*/

const pool = new Pool({
  user: 'root',
  host: 'postgresql-8950-0.cloudclusters.net',
  database: 'evolve',
  password: 'pinturilloteam',
  port: 8960,
})

module.exports = pool;
const Pool = require('pg').Pool

// const pool = new Pool({
//   user: 'root',
//   host: 'localhost',
//   database: 'mydb',
//   password: '1234',
//   port: 5432,
// })


const pool = new Pool({
  user: 'root',
  host: 'postgresql-9746-0.cloudclusters.net',
  database: 'evolve',
  password: '1234',
  port: 9746,
})

module.exports = pool;
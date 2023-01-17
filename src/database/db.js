const { Pool } = require('pg')

//Connecting to database
const pool = new Pool({
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
})
pool.on('error', (error) => console.log(error))
pool.on('connect', () => console.log('Connected to database!!'))

module.exports = pool

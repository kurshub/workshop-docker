const { Pool } = require('pg')
 
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})
 
module.exports = {
  query: (text, params) => pool.query(text, params),
}

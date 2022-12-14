const { Client } = require('pg')

const client = new Client({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})
client.connect()

client.query("CREATE TABLE test ( key VARCHAR, value integer); INSERT INTO test VALUES ('count', 0);")
    .then(() => {
        console.log('table created')
        process.exit(0)
    })

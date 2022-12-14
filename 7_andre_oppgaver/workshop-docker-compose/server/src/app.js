const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/count', async (req, res) => {
    const { rows } = await db.query("SELECT value from test WHERE key='count'")
    res.json({ count: rows[0].value })
})

app.post('/count', async (req, res) => {
    await db.query("UPDATE test SET value=$1::integer WHERE key='count'", [req.body.count])
    res.status(204).send()
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const express = require('express')
const app = express()
const { Pool } = require('pg')
const port = process.env.PORT || 5000

app.use(express.json())

const pool = new Pool({
  user: 'michelle',
  port: 5432,
  password: 'michelle',
  host: 'localhost',
  database: 'cyf_ecommerce',
})

app.get('/', (req, res) => res.send('Hello Express! Ask for customers...'))

app.get('/customers', (req, res) => {
  pool
    .query(`select * from customers`)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(404).json({ msg: 'Not Found' })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
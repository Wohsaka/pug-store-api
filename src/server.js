require('dotenv').config()
const express = require('express')
const usersRoute = require('./routes/users')
const pucharsesRoute = require('./routes/pucharses')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRoute)
app.use('/api/pucharses', pucharsesRoute)

app.listen(4000, () => console.log('Server is listening on port 4000...'))

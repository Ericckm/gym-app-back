const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const exerciseRouter = require('./routers/exercise')
const logRouter = require('./routers/log')

const app = express()

app.use(cors())
app.use(express.json())
app.use(exerciseRouter)
app.use(logRouter)

module.exports = app
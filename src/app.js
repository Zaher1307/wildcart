require('dotenv').config()
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const db = require('./models/')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const reviewRouter = require('./routes/review')
const log = require('./configs/winston-config')

const app = express()
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  table: 'Session'
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookies: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // expires in 7 days
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(cors())

app.get('/healthz', (req, res) => {
  res.status(200).json({ health: 'Great' })
})

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/review', reviewRouter)

app.use((err, req, res, next) => {
  log.error(err)
  res.status(500).json({ message: 'Internal server Error ' })
})

module.exports = app

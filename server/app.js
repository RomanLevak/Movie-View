const config = require('config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('./handlers/session')
const passport = require('passport')
const rootRoute = require('./routes/root')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const errorHandler = require('./handlers/error')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser(config.get('secret')))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.post('/login', loginRoute)
app.post('/register', registerRoute)
app.post('/logout', logoutRoute)
app.use('/', rootRoute)
app.use(errorHandler)

module.exports = app

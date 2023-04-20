const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passportjs = require('./config/passport')
const flash = require('connect-flash')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))


passportjs(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)
app.listen(port, () => {
  console.log('server on')
})
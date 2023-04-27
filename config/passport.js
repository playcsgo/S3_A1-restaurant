const passport = require('passport');
const userModel = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook')
require('dotenv').config()
// npm passport
// https://www.npmjs.com/package/passport

module.exports = app => {
  // 初始化passport middleware 最後兩行
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定localStrategy strategies裡面.
  // 要使用新版的試試看
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    userModel.findOne({ email })
      .lean()
      .then(user => {
        if (!user) {
          req.flash('warning_msg', 'This email is not registered by flash')
          return done(null, false, { message: 'This email is not registered' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            req.flash('warning_msg', 'email or password incorrect by flash')
            return done(null, false, { message: 'email or password incorrect'})
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  //FacebookStrategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    userModel.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-5)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => userModel.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  // session序列與反序列化
  // 序列化: 把user data轉成user_id
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  // 反序列化: 把id轉為user data
  passport.deserializeUser(function(id, done) {
    userModel.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
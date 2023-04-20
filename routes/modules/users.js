const express = require('express')
const router = express.Router()
const userModel = require('../../models/user-model')
const passport = require('passport')
// 這裡是require passport模塊, 因為要使用他的authenticate功能取代 (req, res)的middleware
// 不是config裡面的passport設定
const bcrypt = require('bcryptjs')



// login-1
router.get('/login', (req, res) => {
  res.render('login')
})
// login-2
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register-1
router.get('/register', (req, res) => {
  res.render('register')
})
// register-2
router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都要填寫' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      passport
    })
  }

  userModel.findOne({ email })
    .lean()
    .then(user => {
      if (user) {
        errors.push({ message: '這個email已被註冊了' })
        res.render('register', {
          errors,
          name,
          email,
          password
        })
      } 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => userModel.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res, next) => {
  req.logout(() => {
    req.flash('success_msg', '您已成功登出')
    res.redirect('/users/login')
  })
})

module.exports = router
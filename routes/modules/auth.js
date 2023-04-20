const express = require('express')
const router = express.Router()
const passport = require('passport')

// 跟facebook 要 scope裡面提到的資料
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// 資料無誤就登入
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
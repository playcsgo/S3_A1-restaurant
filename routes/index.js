//使用express.Router()
const express= require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')


//設定modules分流
const restaurants = require('./modules/restaurants')
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')

// middle/auth要檔的的是 home跟restaurants

router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
// 寬鬆的換到後面
router.use('/', authenticator, home)

module.exports = router
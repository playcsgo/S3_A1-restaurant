// 做個middleware的函示來區分使用者登入狀態
// 利用passport裡面的 req.isAuthenticated()來判斷使用者登入情況
// 有登入的可以next()去 home or restaurants
// 還沒登入的就導向到/users/login

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用!')
    res.redirect('/users/login')
  }
}
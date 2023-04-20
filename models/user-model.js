const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cratedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('A1_restaurant-user', userSchema)
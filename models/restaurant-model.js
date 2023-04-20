const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  //id: {type: Number},
  name: {type: String, required: true},
  name_en: {type: String},
  category: {type: String, required: true},
  image: {type: String, required: true},
  location: {type: String, required: true},
  phone: {type: String, required: true},
  google_map: {type: String, required: true},
  rating: {type: Number, required: true},
  description: {type: String, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'A1_restaurant-user',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('A1_restaurant', restaurantSchema)
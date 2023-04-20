const db = require('../../config/mongoose')
const restaurantModel = require('../restaurant-model')
const userModel = require('../user-model')
require('dotenv').config()

const restaurantData = require('../../restaurants.json').results
const bcrypt = require('bcryptjs')

const seedUsers = [
  {
    name: 'player No.1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'player No.2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () =>{
  Promise.all(seedUsers.map(usermap =>{
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(usermap.password, salt))
      .then(hash => userModel.create({
        name: usermap.name,
        email: usermap.email,
        password: hash
      }))
      .then(userData => {
        restaurantData.forEach(restaurant => {
          if (userData.email === 'user1@example.com' && restaurant.id < 4 ) {
            restaurant.userId = userData._id
            restaurantModel.create(restaurant)
          } else if (userData.email === 'user2@example.com' && (restaurant.id > 3 && restaurant.id < 7)) {
            restaurant.userId = userData._id
            restaurantModel.create(restaurant)
          }
        })
      })
      .catch(err => console.log(err))
  }))
  console.log('done')
  // process.exit()
  // 放這麼後面都不行  很可惡耶
})
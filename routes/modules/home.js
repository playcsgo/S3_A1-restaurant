const express= require('express')
const router = express.Router() 
const restaurantModel = require('../../models/restaurant-model')

router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantModel.find({ userId })
    .lean()
    .then(data => {
      res.render('index', { restaurantList: data })
    })
    .catch(err => {
      console.log(err)
    })
})

// search get
router.get('/search', (req, res) => {
  let selectedSort = {
    asc: false,
    desc: false,
    byCategory: false,
    byLocation: false
  }
  let sortMethod
  switch (req.query.sort) {
    case 'asc':
      sortMethod = { name: 'asc' }
      selectedSort.asc = true   
      break
    case 'desc':
      sortMethod = { name: 'desc' }
      selectedSort.desc = true 
      break
    case 'byCategory':
      sortMethod = { category: 'asc' }
      selectedSort.byCategory = true 
      break    
    case 'byLocation':
      sortMethod = { location: 'asc' }
      selectedSort.byLocation = true 
      break
    // default: 
    //   sortMethod = { name: 'asc' }
    //   selectedSort.asc = true
      // break
  }
  const keyword = req.query.keyword.trim().toLowerCase() || ''
  restaurantModel.find()
    .lean()
    .sort(sortMethod)
    .then(results => {
      const filteredRestaurants = results.filter(restaurant =>
        restaurant.name.toLocaleLowerCase().includes(keyword) ||
        restaurant.name_en.toLocaleLowerCase().includes(keyword) ||
        restaurant.category.toLocaleLowerCase().includes(keyword)
      )
      res.render('index', { restaurantList: filteredRestaurants, selectedSort, keyword })
    })
    .catch(err => console.log(err))
})


module.exports = router
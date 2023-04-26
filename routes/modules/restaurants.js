const express = require('express')
const router = express.Router()
const restaurantModel = require('../../models/restaurant-model')


// C-1
router.get('/create', (req, res) => {
  res.render('create')
})
// C-2
router.post('/new', (req, res) => {
  req.body.userId = req.user._id
  restaurantModel.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// R
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  restaurantModel.findById(id)
    .lean()
    .then(data => {
      res.render('show', { restaurant: data })
    })
    .catch(err => {
      console.log(err)
    })
})

// U-1
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantModel.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(err => console.log(err))
})

// U-2
router.put('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  req.body.user = userId
  restaurantModel.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// D
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  restaurantModel.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err) )
})

module.exports = router
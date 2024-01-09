const express = require('express')
const router  = express.Router()
const {getAllCities,createCities,updateCities,deleteCities} = require('../controllers/cities-coontroller')


router.route('/').get(getAllCities).post(createCities)
router.route('/:id').patch(updateCities).delete(deleteCities)


module.exports = router
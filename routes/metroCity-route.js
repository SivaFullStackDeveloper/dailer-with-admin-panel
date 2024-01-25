const express = require('express')
const router  = express.Router()
const {getAllCities,createCities,updateCities,deleteCities,getAllSubCities} = require('../controllers/metroCity-controller')


router.route('/').get(getAllCities).post(createCities)
router.route('/:id').patch(updateCities).delete(deleteCities)
router.route('/subcities').get(getAllSubCities)



module.exports = router
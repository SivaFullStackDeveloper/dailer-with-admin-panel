const express = require('express')
const router  = express.Router()
const {getAllCities,createCities,updateCities,deleteCities,getAllStates,getAllDistricts,getAllCity,getAllMandal,getAllVilage} = require('../controllers/cities-coontroller')


router.route('/').get(getAllCities).post(createCities)
router.route('/:id').patch(updateCities).delete(deleteCities)
router.route('/states').get(getAllStates)
router.route('/districts').get(getAllDistricts)
router.route('/cities').get(getAllCity)
router.route('/mandal').get(getAllMandal)
router.route('/village').get(getAllVilage)


module.exports = router
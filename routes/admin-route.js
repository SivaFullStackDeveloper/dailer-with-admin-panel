const express = require('express')
const router  = express.Router()
const {registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)
router.route('/updateBusiness').post(updateBusinessUserFromAdmin)

module.exports = router

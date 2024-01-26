const express = require('express')
const router  = express.Router()
const {registerUserCount,searchUserbyNumberOrLocation} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)

module.exports = router

const express = require('express')
const router  = express.Router()
const registerUserCount = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)

module.exports = router

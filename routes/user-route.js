const express = require('express')
const router  = express.Router()
const {updateBusinessUser,updateUser} = require('../controllers/user-controller')


router.route('/updateBusiness').patch(updateBusinessUser)
router.route('/updateUser').patch(updateUser)

module.exports = router
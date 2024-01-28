const express = require('express')
const router  = express.Router()
const {registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin,deleteCommentRating} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)
router.route('/updateBusiness').post(updateBusinessUserFromAdmin)
router.route('/deleteCommentAndRating').delete(deleteCommentRating)

module.exports = router

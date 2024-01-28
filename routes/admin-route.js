const express = require('express')
const router  = express.Router()
const {registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin,deleteCommentRating,updateUserFromAdmin} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)
router.route('/updateBusiness').post(updateBusinessUserFromAdmin)
router.route('/deleteCommentAndRating').delete(deleteCommentRating)
router.route('/updateUser').patch(updateUserFromAdmin)

module.exports = router

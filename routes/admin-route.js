const express = require('express')
const router  = express.Router()
const {getUsersByDate,registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin,deleteCommentRating,updateUserFromAdmin,getBusinessUsersByDate} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)
router.route('/updateBusiness').post(updateBusinessUserFromAdmin)
router.route('/deleteCommentAndRating').delete(deleteCommentRating)
router.route('/updateUser').patch(updateUserFromAdmin)
router.route('/getBusinessUsersBydate').get(getBusinessUsersByDate)
router.route('/getUsersBydate').get(getUsersByDate)
module.exports = router

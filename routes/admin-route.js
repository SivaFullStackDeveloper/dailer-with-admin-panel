const express = require('express')
const router  = express.Router()
const {registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin,deleteCommentRating,updateUserFromAdmin,getBusinessUsersByDate} = require('../controllers/admin-controller')

router.route('/registerUserCount').post(registerUserCount)
router.route('/search').get(searchUserbyNumberOrLocation)
router.route('/updateBusiness').post(updateBusinessUserFromAdmin)
router.route('/deleteCommentAndRating').delete(deleteCommentRating)
router.route('/updateUser').patch(updateUserFromAdmin)
router.route('/getBusinessUsersBydate/:userProvidedDate').get(getBusinessUsersByDate)

module.exports = router

const express = require('express')
const router  = express.Router()
const {updateBusinessUser,updateUser} = require('../controllers/user-controller')
const multer = require('multer');
const upload = multer();



router.route('/updateBusiness').patch(updateBusinessUser)
router.route('/updateUser',upload.any('profilePicture')).patch(updateUser)

module.exports = router
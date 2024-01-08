const express = require('express')
const router  = express.Router()
const {updateBusinessUser,updateUser} = require('../controllers/user-controller')
var multer = require('multer');
const upload = multer();

router.use(upload.any('profilePicture'))


router.route('/updateBusiness').patch(updateBusinessUser)
router.route('/updateUser').patch(updateUser)



module.exports = router
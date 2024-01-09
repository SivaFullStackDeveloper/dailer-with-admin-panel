const express = require('express')
const router  = express.Router()
const {updateBusinessUser,updateUser} = require('../controllers/user-controller')
const multer  = require('multer')
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};
var storage = multer.diskStorage({
    fileFilter: fileFilter,
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + "--" +file.originalname)
    }
})
var upload = multer({ storage: storage })

router.use(upload.single('profilePicture'))


router.route('/updateBusiness').patch(updateBusinessUser)
router.route('/updateUser').patch(updateUser)



module.exports = router
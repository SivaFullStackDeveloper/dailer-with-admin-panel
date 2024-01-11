const express = require('express')
const router  = express.Router()
const {updateUser,getUser} = require('../controllers/user-controller')
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


router.route('/updateUser').patch(updateUser)

router.route('/getUser').get(getUser)



module.exports = router
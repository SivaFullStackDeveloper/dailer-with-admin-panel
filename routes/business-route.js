require('express-async-errors')
const express = require('express')
const router  = express.Router()
const {updateBusinessUser,getBusinessDetails,getCategoryBusinessList,getAllBusinessList} = require('../controllers/business-controller')
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
var upload = multer({ storage: storage }).fields([
{name:"businessPictures",maxCount:10},
{name:"businessProfilePhoto",maxCount:1},
{name:"businessCoverPhoto",maxCount:1}
])



router.get('/getAllBusinessList',getAllBusinessList)
router.patch('/updateBusiness',upload,updateBusinessUser)
router.get('/getBusinessDetails',getBusinessDetails)
router.get('/getCategoryBusinessList',getCategoryBusinessList)

module.exports = router
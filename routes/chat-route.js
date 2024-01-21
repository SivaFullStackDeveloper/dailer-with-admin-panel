const express = require('express')
const router  = express.Router()
const  {getUserChats,getSingleChatThread,createChatThread,getBusinessUserChats,sendMessage} = require('../controllers/chat-controller')
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

router.use(upload.single('messagePicture'))



router.route('/getUserChats').get(getUserChats)
router.route('/getBusinessUserChats').get(getBusinessUserChats)
router.route('/getSingleChatThread').get(getSingleChatThread)
router.route('/createChatThread').post(createChatThread)
router.route('/sendMessage').post(sendMessage)
module.exports = router
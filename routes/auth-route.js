const express = require('express')
const router  = express.Router()
const {sendOtp,verifyOTP} = require('../controllers/otp-controller')
const {login,register,userAlreadyExists} = require('../controllers/auth-controller')
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



router.post('/userAlreadyExists',userAlreadyExists)
router.post('/login',login)
router.post('/register',upload.single('profilePicture'),register)
router.post('/sendOTP',sendOtp)
router.post('/verifyOTP',verifyOTP)
router.post('/upload', upload.any(), function (req, res, next) {
console.log(req.files.length)
  if (req.files.length>0) {
    let  Pictures = []

    for(let i = 0;i<req.files.length;i++){
      const paths = req.files[i].path.replace(/\\/g, "/")
      const url = "https://dailer-backend.onrender.com/" + paths
      Pictures.push(url)
  }
    
      return res.status(200).json({ success: true, data: Pictures, message: "Upload successfull" })
  }
  else {
      next(Error("File missing"));
  }
})




module.exports = router
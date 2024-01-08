const express = require('express')
const router  = express.Router()
const {sendOtp,verifyOTP} = require('../controllers/otp-controller')
const {login,register,userAlreadyExists} = require('../controllers/auth-controller')

const multer = require('multer');
const upload = multer();



router.post('/userAlreadyExists',userAlreadyExists)
router.post('/login',login)
router.post('/register',upload.any(),register)
router.post('/sendOTP',sendOtp)
router.post('/verifyOTP',verifyOTP)





module.exports = router
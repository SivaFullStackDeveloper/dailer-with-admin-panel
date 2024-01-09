require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const businessDetailsSchema = require('../models/business-model')
const { BadRequestError } = require('../error/bad-request')

const updateBusinessUser = async(req,res)=>{

  if(!req.files.businessPictures || !req.files.businessProfilePhoto ||!req.files.businessCoverPhoto ){
    return res.status(404).json({
      msg:"required fileds of businessPictures, businessProfilePhoto ,businessCoverPhoto",
      statusCode:404,
    success:false 
     })
  }
  let  businessPictures = []
  let  businessProfilePhoto = req.files.businessProfilePhoto.path
  let  businessCoverPhoto = req.files.businessCoverPhoto.path
  for(let i = 0;i<req.files.businessPictures.length;i++){
    const paths = req.files.businessPictures[i].path.replace(/\\/g, "/")
    const url = "https://dailer-backend.onrender.com/" + paths
    businessPictures.push(url)
}

const businessDetails = await businessDetailsSchema.create(req.body)

// const businessDetails = await businessDetailsSchema.create(...req.body)
 
//  res.status(StatusCodes.OK).json({ 
//   data:[businessDetails],
//   "msg":"Data updated successfully",
//   "statusCode":StatusCodes.OK,
//   "success":true,
// })
}

module.exports = {updateBusinessUser}
require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const  BadRequestError = require('../error/bad-request')
const  UnAuthenticatedError = require('../error/unauthenticated')





const updateBusinessUser = async(req,res)=>{
  const user = await UserSchema.findByIdAndUpdate({_id:req.body.id},{businessDetails:req.body},{
    new: true,
    runValidators: true,
  }) 

 res.status(StatusCodes.OK).json({ 
  data:[...user.businessDetails],
  "msg":"Data updated successfully",
  "statusCode":StatusCodes.OK,
  "success":true,
})
}







const updateUser = async(req,res)=>{
  const user = await UserSchema.findByIdAndUpdate({_id:req.body.id},{...req.body},{
    new: true,
    runValidators: true,
  }) 

 res.status(StatusCodes.OK).json({
  data:[{
    id:user._id,
    name:user.name,
    ownerName:user.ownerName,
    email:user.email,
    pinCode:user.pinCode,
    phoneNumber:user.phoneNumber,
    state:user.state,
    district:user.district,
    city:user.city,
    webLink:user.webLink,
    alternateNumber:user.alternateNumber,
    businessDetails:user.businessDetails,
  }],
  "msg":"Data updated successfully",
  "status code":StatusCodes.OK,
  "success":true,
})

}

module.exports = {updateBusinessUser,updateUser}







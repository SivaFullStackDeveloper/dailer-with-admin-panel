require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')



const getUser = async(req,res)=>{
  const user = await UserSchema.findOne({_id:req.user.userId},)
  res.status(200).json({
        id: user._id,
        name: user.name,
        jobTitle: user.jobTitle,
        companyName: user.companyName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        alternateNumber:user.alternateNumber,
        webLink: user.webLink,
        city: user.city,
        district:user.district,
        state: user.state,
        pinCode:user.pinCode,
        businessRegister:  user.businessRegister,
        userBlocked: user.userBlocked,
        profilePicture: user.profilePicture,


      "msg":"Fetched Data successfully",
      "statusCode":StatusCodes.OK,
      "success":true,
    
    })


}
const updateUser = async(req,res)=>{
  console.log(req.file)
  const paths = req.file.path.replace(/\\/g, "/")
  const url = "https://dailer-backend.onrender.com/" + paths
  const user = await UserSchema.findByIdAndUpdate({_id:req.user.userId},{...req.body},{
    new:true,
    runValidators: true,
})
  const updateUser = await UserSchema.findByIdAndUpdate({_id:req.user.userId},{profilePicture:url},{
    new:true,
    runValidators: true,
})

 res.status(StatusCodes.OK).json({
  data:[{
    id:updateUser._id,
    name:updateUser.name,
    ownerName:updateUser.ownerName,
    email:updateUser.email,
    pinCode:updateUser.pinCode,
    phoneNumber:updateUser.phoneNumber,
    state:updateUser.state,
    district:updateUser.district,
    city:updateUser.city,
    webLink:updateUser.webLink,
    alternateNumber:updateUser.alternateNumber,
    profilePicture:updateUser.profilePicture,
    businessDetails:updateUser.businessDetails,
  }],
  "msg":"Data updated successfully",
  "statusCode":StatusCodes.OK,
  "success":true,
})

}

module.exports = {updateUser,getUser}







require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const businessSchema = require('../models/business-model')


const registerUserCount = async(req,res)=>{

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const userCount = await UserSchema.find({createdAt: {$gte: today}})
    console.log(userCount)

    res.status(200).json({
        todayUserRegistred:userCount,
        "statusCode":StatusCodes.OK
    })

}

const getCategoryBusinessList = async(req,res)=>{
     const businessDetails = await businessDetailsSchema.find({'location' :req.body.location}).sort('-date').limit(10)
      res.status(200).json({businessDetails})
  }

  const getUserList = async(req,res)=>{ 
    const userDetails = await UserSchema.find({}).sort('-date').limit(100)
     res.status(200).json({userDetails})
 }

 const getBusinessUsersByDate = async(req,res)=>{
    const businessUserDetails = await businessSchema.find({}).sort('-date').limit(100)
     res.status(200).json({userDetails})
 }
const searchUserbyNumberOrLocation =  async (req, res) => {
    const { phoneNumber, location} = req.query;


  if(phoneNumber){
    const user = await UserSchema.findOne({phoneNumber:phoneNumber})
    const BusinessUser = await businessSchema.findOne({phoneNum1:phoneNumber})

    res.status(200).json({
    data:[{
      user:user,
      businessUser:BusinessUser,
    }]  
    });
 
  }
if(location){
const users = await UserSchema.find({city:location})
res.json(users);
}
}


module.exports = {registerUserCount,searchUserbyNumberOrLocation}
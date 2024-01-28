require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const businessSchema = require('../models/business-model')
const businessDetailsSchema = require('../models/business-model')
const groupModel = require('../models/group-model')
const { BadRequestError } = require('../error/bad-request')

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


const updateBusinessUserFromAdmin = async(req,res)=>{
  if(!req.body.cityName){
    res.status(404).json({msg:"please provide city name it is mandatory"})
  }

  await UserSchema.findOneAndUpdate({_id:req.body.userId},{businessRegister:true});
let groupExist = await groupModel.findOne({groupName:req.body.cityName})

let  businessPictures = req.body.businessGallery

const  businessProfilePhoto = req.body.businessProfilePhoto
const   businessCoverPhoto = req.body.businessCoverPhoto
const user = await businessDetailsSchema.findOne({userId:req.body.userId})
const businessDetailsExist = await businessDetailsSchema.findOne({userId:req.body.userId})

if(businessDetailsExist){
  const userDetails = {
    id:req.body.userId,
    name:req.body.businessName,
    phoneNumber: req.body.phoneNum1,
    userType:"BusinessUser",
    image:businessProfilePhoto,
  }
  let details = groupExist;
console.log(details[0])
  if(groupExist){
    groupExist.groupMembers.push(userDetails)
       await groupExist.save();
  }
 const businessDetails= await businessDetailsSchema.findOneAndUpdate({userId:req.body.userId},{
    userId:req.body.userId,
    businessProfilePhoto:businessProfilePhoto,
    businessCoverPhoto:businessCoverPhoto,
    businessName: req.body.businessName,
    mailId: req.body.mailId,
    phoneNum1: req.body.phoneNum1,
    phoneNumAlternative: req.body.phoneNumAlternative,
    district: req.body.district,
    cityName: req.body.cityName,
    stateName:req.body.stateName,
    address: req.body.address,
    category: req.body.category,
    subcategories: req.body.subcategories,
    PinCode: req.body.PinCode,
    isLoggedIn: req.body.isLoggedIn,
    WebLink: req.body.WebLink,
    businessGallery: businessPictures,
    comments: req.body.comments,
    rating: req.body.rating,
    reviews: req.body.reviews,
    paymentsAccepted:req.body.paymentsAccepted,
    yearOfEstablishmen: req.body.yearOfEstablishmen,
    businessAboutUs:req.body.businessAboutUs,
    workingHours: req.body.workingHours,
    keyWords:req.body.keyWords,
    location:req.body.location,
    socialMediaLink: req.body.socialMediaLink,
    languageSpoken:req.body.languageSpoken,
    parkingAvilbility: req.body.parkingAvilbility,
    videoTestimons: req.body.videoTestimons,
    numberOfStaff: req.body.numberOfStaff,
    achivementsAwards: req.body.achivementsAwards,
    fastResponseTime: req.body.fastResponseTime,
    currentResponseTime: req.body.currentResponseTime,
    getDicrection:req.body.getDicrection,
    verified: req.body.verified,
    holidays: req.body.holidays,
  },{
    new:true,

  })
  res.status(201).json({
    businessDetails
  })
}else{
  const userDetails = {
    id:req.body.userId,
    name:req.body.businessName,
    phoneNumber: req.body.phoneNum1,
    userType:"BusinessUser",
    image:businessProfilePhoto,
  }
  if(groupExist){
    groupExist.groupMembers.push(userDetails)
    await groupExist.save();
  }
  const businessDetails = await businessDetailsSchema.create(
    {
      userId:req.body.userId,
      businessProfilePhoto:businessProfilePhoto,
      businessCoverPhoto:businessCoverPhoto,
      businessName: req.body.businessName,
      mailId: req.body.mailId,
      phoneNum1: req.body.phoneNum1,
      phoneNumAlternative: req.body.phoneNumAlternative,
      district: req.body.district,
      cityName: req.body.cityName,
      stateName:req.body.stateName,
      address: req.body.address,
      category: req.body.category,
      subcategories: req.body.subcategories,
      PinCode: req.body.PinCode,
      isLoggedIn: req.body.isLoggedIn,
      WebLink: req.body.WebLink,
      businessGallery: businessPictures,
      comments: req.body.comments,
      rating: req.body.rating,
      reviews: req.body.reviews,
      paymentsAccepted:req.body.paymentsAccepted,
      yearOfEstablishmen: req.body.yearOfEstablishmen,
      businessAboutUs:req.body.businessAboutUs,
      workingHours: req.body.workingHours,
      keyWords:req.body.keyWords,
      location:req.body.location,
      socialMediaLink: req.body.socialMediaLink,
      languageSpoken:req.body.languageSpoken,
      parkingAvilbility: req.body.parkingAvilbility,
      videoTestimons: req.body.videoTestimons,
      numberOfStaff: req.body.numberOfStaff,
      achivementsAwards: req.body.achivementsAwards,
      fastResponseTime: req.body.fastResponseTime,
      currentResponseTime: req.body.currentResponseTime,
      getDicrection:req.body.getDicrection,
      verified: req.body.verified,
      holidays: req.body.holidays,
    })

  await UserSchema.findByIdAndUpdate({_id:req.body.userId},{businessRegister:true})

  res.status(201).json({
    businessDetails
  })
}

}


const deleteCommentRating = async (req, res) => {
  try {
    const business = await businessSchema.findOne({ _id: req.body.businessId });

    business.ratingAndComments =await  business.ratingAndComments.filter(
      (comment) => comment.userId.toString() !==req.body.userId
    );

    await business.save();

    res.status(200).json({
      msg: "Deleted comment and rating successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      statusCode: 500,
    });
  }
};




const updateUserFromAdmin = async(req,res)=>{
  const id = (req.body.id)
  let user  = await UserSchema.findOneAndUpdate({_id:id},{...req.body},{new:true,runValidators:true})
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
      profilePicture:user.profilePicture,
      businessDetails:user.businessDetails,
      businessRegister: false,
      userBlocked: user.userBlocked,
      active: user.active,
      jobTitle: user.jobTitle,
      companyName: user.companyName,
    }],
    "msg":"Data updated successfully",
    "statusCode":StatusCodes.OK,
    "success":true,
  })
  }


module.exports = {registerUserCount,searchUserbyNumberOrLocation,updateBusinessUserFromAdmin,deleteCommentRating,updateUserFromAdmin}
require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const businessDetailsSchema = require('../models/business-model')
const { BadRequestError } = require('../error/bad-request')

const updateBusinessUser = async(req,res)=>{
  console.log(req)
  console.log(req.user.userId)
  if(!req.files.businessPictures || !req.files.businessProfilePhoto ||!req.files.businessCoverPhoto ){
    return res.status(404).json({
      msg:"required fileds of businessPictures, businessProfilePhoto ,businessCoverPhoto",
      statusCode:404,
    success:false 
     })
  }
  let  businessPictures = []

  for(let i = 0;i<req.files.businessPictures.length;i++){
    const paths = req.files.businessPictures[i].path.replace(/\\/g, "/")
    const url = "https://dailer-backend.onrender.com/" + paths
    businessPictures.push(url)
}

const  businessProfilePhoto = "https://dailer-backend.onrender.com/" +req.files.businessProfilePhoto[0].path.replace(/\\/g, "/")
const   businessCoverPhoto = "https://dailer-backend.onrender.com/" +req.files.businessCoverPhoto[0].path.replace(/\\/g, "/")

const businessDetailsExist = await businessDetailsSchema.findOne({userId:req.body.userId})

if(businessDetailsExist){
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
const getBusinessDetails = async(req,res)=>{
  const businessDetails = await businessDetailsSchema.findOne({_id:req.body.businessId})
  res.status(200).json({
    businessDetails
  })
}

const getCategoryBusinessList = async(req,res)=>{
  const businessDetails = await businessDetailsSchema.find({'category' : req.body.category,'location' :req.body.location})
  res.status(200).json({businessDetails})

}

const getAllBusinessList = async(req,res)=>{
  let { verified, rating, businessName, keyWords, subcategories,  } = req.query;
  const queryObject = {};
  if (rating) {
    rating = {'$gte':rating}
  }
  console.log(rating)
  if (verified) {
    queryObject.verified = verified === 'true' ? true : false;
  }
  if(businessName){
    queryObject.businessName = { $regex: businessName, $options: 'i' }
  }
  if(subcategories){
    queryObject.subcategories = { $regex: subcategories, $options: 'i' }
  }
  if(keyWords){
    queryObject.keyWords = { $regex: keyWords, $options: 'i' }
  }
  console.log(queryObject)
  const businessDetails = await businessDetailsSchema.find(queryObject)
  res.status(200).json({businessDetails})

}
const BusinessViwersCount = async(req,res)=>{
  let businessDetails = await businessDetailsSchema.find({userId:req.user.userId})
  await businessDetailsSchema.findOneAndUpdate({userId:req.user.userId},{
    viwersCount:businessDetails[0].viwersCount+1})
  res.status(200).json({businessDetails})

}

module.exports = {updateBusinessUser,getBusinessDetails,getCategoryBusinessList,getAllBusinessList,BusinessViwersCount}
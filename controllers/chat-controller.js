require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const chatSchema = require('../models/chat-model')
const businessSchema = require('../models/business-model')
const { BadRequestError } = require('../error/bad-request')

const getUserChats = async(req,res)=>{

    const userChats = await chatSchema.find({ userId: req.user.userId })
    res.status(200).json({userChats})
  }

  const getBusinessUserChats = async(req,res)=>{
    const businessUserChats = await chatSchema.find( { userId: req.body.businessUserId })
    res.status(200).json({userChats})
  }
const getSingleChatThread = async(req,res)=>{
    const userChats = await chatSchema.find({$or: [ { userId: req.user.userId }, { businessUserId:  req.body.businessUserId },]})
    res.status(200).json({userChats})
}

const createChatThread = async(req,res)=>{
    console.log(30 * 24 * 60 * 60)
    const user = await UserSchema.findOne({_id:req.body.userId})
    const businessUser = await businessSchema.findOne({_id:req.body.businessUserId})
    const userChats = await chatSchema.find({$or: [ { userId: req.user.userId }, { businessUserId:  req.body.businessUserId },]})
if(!userChats){
    let body = {
        userId : user._id,
        userName : user.name,
        userImage : user.profilePicture,
        businessUserId : businessUser._id,
        businessUserImage :businessUser.businessProfilePhoto,
        businessUserName :businessUser.businessName
        }

     const userChats = await chatSchema.create(body)
     res.status(200).json({userChats})
}else{
    res.status(200).json({
        alreadyExists:true,
        data:userChats}) 
}
}


  const sendMessage = async(req,res)=>{
    let userChats = await chatSchema.find({$or: [{ userId: req.body.userId}, { businessUserId:  req.body.businessUserId },]})
    console.log(userChats[0].messages)
    let message = {
    userType:req.body.userType,
    message:req.body.message,
    images:"",    
    }
   userChats[0].messages.push(message)
    userChats[0].messages = allMesages 
    console.log(userChats)
    res.status(200).json({userChats})
  }

  module.exports = {getUserChats,getSingleChatThread,createChatThread,getBusinessUserChats,sendMessage}
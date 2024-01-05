require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const  BadRequestError = require('../error/bad-request')
const  UnAuthenticatedError = require('../error/unauthenticated')


const userAlreadyExists = async(req,res)=>{
    const  { email,phoneNumber} = req.body 
    if(email ===" " ||phoneNumber ===" "){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message":"Please enter required fields email or phone number ",
            "alreadyExists":true,
            "statusCode":StatusCodes.BAD_REQUEST
        })
    }
    const emailAlreadyExists = await UserSchema.findOne({email})
    if(emailAlreadyExists){
        return  res.status(200).json({
            "message":"Email Already Exists",
            "alreadyExists":true,
            "statusCode":StatusCodes.OK
        })
    }
    const phoneNumberAlreadyExists = await UserSchema.findOne({phoneNumber})
    if(phoneNumberAlreadyExists){
       return  res.status(200).json({
            "message":"Phone Number Already Exists",
            "alreadyExists":true,
            "statusCode":StatusCodes.OK
        })
    }

    res.status(200).json({
        "message":"Nothing found",
        "alreadyExists":false,
        "statusCode":StatusCodes.OK
    })
}

const register = async(req,res)=>{

    const user = await UserSchema.create(req.body)
    const token =  user.createJwt(user._id,user.name)

    res.status(StatusCodes.CREATED).json({
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
            token:token
        }],
        "msg":"user registered successfully",
        "statusCode":StatusCodes.OK,
       })
}



const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Invalid credentials")
    }
    const user = await UserSchema.findOne({email})
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')  
    }

    const isPassword = await user.comparePassword(password)
    if(!isPassword){
        throw new UnAuthenticatedError('Invalid Credentials')  
    }
 const token = user.createJwt(user._id,user.name)

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
            businessDetails:user.businessDetails,token:token
        }],
        "msg":"user loggedIn successfully",
        "statusCode":StatusCodes.OK,
        "success":true,

     })
}



module.exports = {login,register,userAlreadyExists}
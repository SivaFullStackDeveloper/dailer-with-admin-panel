require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const groupModel =  require('../models/group-model')
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
    let url;
    if(req.file===undefined){
        url = "https://dailer-backend.onrender.com/uploads/profile.png" 
        const user = await UserSchema.create(req.body);
        let groupExist = await groupModel.findOne({groupName:user.city})

        const adminDetails = {
            id:'admin',
            name:"jk",
            phoneNumber:"ask Jk Admin Phone",
            userType:"admin",
            image:""
        }
        const userDetails = {
            id:user._id,
            name:user.name,
            phoneNumber:user.phoneNumber,
            userType:"user",
            image:url
        }
        if(groupExist){
            groupExist.groupMembers.push(userDetails)
               await groupExist.save();
        }else{
            await groupModel.create({groupName:user.city,groupMembers:[userDetails,adminDetails]})
        }
        const token =  await user.createJwt(user._id,user.name)
        console.log(token)
        const updateUser = await UserSchema.findByIdAndUpdate({_id:user._id},{profilePicture: url},{
                new:true,
                runValidators: true,
            })
 
 
    res.status(StatusCodes.CREATED).json({
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
            businessRegister:user.businessRegister,
            createdAt:updateUser.createdAt,
            token:token
        }],
        "msg":"user registered successfully",
        "statusCode":StatusCodes.OK,
       }) 
    }  else{
        const paths = req.file.path.replace(/\\/g, "/")
        url = "https://dailer-backend.onrender.com/" + paths
       const user = await UserSchema.create(req.body);
       const token =  await user.createJwt(user._id,user.name)
       console.log(token)
       const updateUser = await UserSchema.findByIdAndUpdate({_id:user._id},{profilePicture: url},{
               new:true,
               runValidators: true,
           })

           let groupExist = await groupModel.find({groupName:user.city})
           console.log(groupExist)
           const adminDetails = {
               id:'admin',
               name:"jk",
               phoneNumber:"ask Jk Admin Phone",
               userType:"admin",
               image:""
           }
           const userDetails = {
               id:user._id,
               name:user.name,
               phoneNumber:user.phoneNumber,
               userType:"user",
               image:url
           }
           console.log(groupExist)
           if(groupExist){
            groupExist.groupMembers.push(userDetails)
            await groupExist.save();
           }else{
            await groupModel.create({groupName:user.city,groupMembers:[adminDetails,userDetails]})
        }
   res.status(StatusCodes.CREATED).json({
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
           businessRegister:user.businessRegister,
           createdAt:updateUser.createdAt,
           token:token
       }],
       "msg":"user registered successfully",
       "statusCode":StatusCodes.OK,
      })
    }
    
}



const login = async(req,res)=>{
    const {phoneNumber,password} = req.body
    if(!phoneNumber || !password){
        throw new BadRequestError("Invalid credentials")
    }
    const user = await UserSchema.findOne({phoneNumber})
    if(user.userBlocked ===true){
        res.status(404).json({
            msg:"User is blocked",
            success:false,
            statuscode:404,
            isBlockedOrNot:true,
        })
    }else{
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
                profilePicture:user.profilePicture,
                createdAt:user.createdAt,
                businessRegister:user.businessRegister,
                token:token,
                userBlocked:user.userBlocked,
            }],
            "msg":"user loggedIn successfully",
            "statusCode":StatusCodes.OK,
            "success":true,
            isBlockedOrNot:false,
         })
    }

}



module.exports = {login,register,userAlreadyExists}
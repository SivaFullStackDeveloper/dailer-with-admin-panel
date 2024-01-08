require('express-async-errors')
const multer = require('multer')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const  BadRequestError = require('../error/bad-request')
const  UnAuthenticatedError = require('../error/unauthenticated')
const stream = require('stream');
const fs = require('fs')
const { google } = require('googleapis');
//const googleApiKeys = require('../dailer-images-api.json')

let picture = "";


const authorize = async()=>{
    const jwtClient = new google.auth.JWT(
        "siva-338@dailer-images.iam.gserviceaccount.com",
        //googleApiKeys.client_email,
        null,
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrORF0ibPP+/r5\nuojnK+p0rGvyicShIJ0LX52EsefnIAwI+7fptBl1EYeK2kBtreNtLwf4xFsiW2Ez\nqnSxL7qbbuERfHBp/mNl73pDzoD3Pq1gXdhk7zha+VT89F2SBXRY5TIFrjRVndzH\nj0JNqE/wsgI0XvCHoXlafrWt+RQU9lhqsiouBuOuU1v3blZ3aDk/jt1CDAOMet8m\nfAtaOeYK3icQCBe2adHgeRFa3XKvlpJzd8V1lxOXMrWwo3SdkievI8KXGgWQ3eeT\nIUvMLhKz8h2aWvMff8lQMJ1VdjjDk+WwfgCMHuzek02VwSXYhy4Wc4jz17VitvAz\nbifaNb55AgMBAAECggEACijatkrYFoaManZSWpUqgOhyMfP8F4DIkLzdqy/7OKWY\nJo2jvgQ9C8s8ewAJmU3GFDEZjKiUrRc1pKEqnLuI8QwajV+63oSFAAQTrHj7rLAA\nDZsZP0lKfhYT9ZEdCZBf9PO0jM28to/QDS9HmeAGI5wMXBsos9jgSymq52XDdp2G\nauEJXgFQ324H4GMiznZ2hK6mhhctLjgikv0EyaVTVBKpUnvohLmoanhxpClW/VUr\nbFKP6ord0RgwDI6imTdzF4Ifdgkg5H5cfggm5iWWOWaDxmLNLiFLRvg6iyxD9E2k\nRYHiZs3Ao3dfqYEBTWcRIBKmU0hIO7rOZT7nYCyD2QKBgQDoNj1pELPsRHCxytXD\nIXdNSrySLrILsSz9nQbWZqddJeiQ4KfFDSciUMEBRG0YBIBMXKYmmzmcHH+nGNCJ\nFS3bpZGbtMWXPZB3K/5b7cvKKWE+GoSv/NVa6vLF+okldUN0h1/SIYo4xR8sUXsK\n9fm+nhwjbos7quUQ2h5cGGCPQwKBgQC8w2ReKnIRvci6hFmEcKxY/LAzU8FUPLy7\n+4GZGsHTdMgdSQ7BqBuYEp/1+mrhUSZJgICsx9Yt+BZ58EHs0LdmqIq3AKlhn2jv\nm+Q/SWUzDw9IEdCsUWtb5rNRcp3IcGXoz+IEPQPHBdW0+wY9DAvi8+bMDE2ES1jz\nwOPgtWtpkwKBgE2BHQoeSw9G4J5W5vYUC2++zCW2dDK21h9n88pHxQCwEGmasiRw\n+WjYrzKvFgJ4LiJOoh4snRPf5zNsct3uNbokDu97bJ/IKpm8E0+3lNdK7GwACd17\nc/K+jH1L286mzvbr4C2QiEPed0MhhwHni43108p3sP0fUwlG4+81K7VlAoGAdU3b\nlqU8BAhzsG1FEAfRIu/NM+htsUKZaxyt+g5lu1nMbl6TXAdzNnsEiyEWwHTknTLN\nRBJf6GtO1HJZFajTAGnm4jj4CeG9nYG8QxQCXsuSDJB9pEhotlDUyN24bfJjcl2V\nsFqWeV0H5JNG2jMdQ+mcWNugZIFKgxgwxNkZKh8CgYEA1W0YO2zpe929zZ94HCVm\n1Bt//HuxhF0ab977wHzKPxL5eyTO9rQgRmEHTvhE+1NCdWcf8K2xA6TRjBpRsPpv\nv1dlWND+de2BMgKgW/qPb3L2AEUO8fuF00IdZbcXQAVOY21hWxgBd+3Up/FcWFzL\nP4/ykyrEpDmowAhfPrcz/rs=\n-----END PRIVATE KEY-----\n",
        //googleApiKeys.private_key,
        'https://www.googleapis.com/auth/drive'
    );
await jwtClient.authorize();

return jwtClient
}


const upload2 = async(fileObject,authClient)=>{
    const name = Date.now()
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    return new Promise((resolve,rejected)=>{

        const drive = google.drive({version: "v3",auth:authClient})
        const fileMetaData = {
            name:`${name}`,
            parents:['1VdRACsGTqDj8ToCcEEnmLhVzzNf6LQ2G']
        }
        drive.files.create({
            resource:fileMetaData,
            media:{
                body:bufferStream,
                mimetype:'image/png'
            },
            fields:'id'
        },async (err,file)=>{
 
            if(err){
                rejected(err)
            }
            await drive.permissions.create({
                fileId:file.data.id,
                requestBody:{
                    role:"reader",
                    type:"anyone"
                }
            })
        
            resolve(file)
            picture = `https://drive.google.com/uc?export=view&id=${file.data.id}`;
        })
    })

}


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
  
    
        const { files } = req;
        const credits = await authorize()
        await upload2(files[0],credits)
     
    const user = await UserSchema.create(req.body)
    const token =  user.createJwt(user._id,user.name)
    const updateUser = await UserSchema.findByIdAndUpdate({_id:user.id},{profilePicture:picture},{
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
            businessDetails:updateUser.businessDetails,
            createdAt:updateUser.createdAt,
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
            profilePicture:user.profilePicture,
            createdAt:user.createdAt,
            businessDetails:user.businessDetails,token:token
        }],
        "msg":"user loggedIn successfully",
        "statusCode":StatusCodes.OK,
        "success":true,

     })
}



module.exports = {login,register,userAlreadyExists}
require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
let addRatingAndCommetsModel = require('../models/addRatingAndComments-model')
const businessModel = require('../models/business-model')
const likesModel = require('../models/likeOrRmoveLike-model')


const getUser = async(req,res)=>{
  const user = await UserSchema.findOne({_id:req.body.userId},)
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
  let url;

  if(req.file===undefined){
    url = "https://dailer-backend.onrender.com/uploads/profile.png" 
    const user = await UserSchema.findByIdAndUpdate({_id:req.body.userId},{...req.body},{
      new:true,
      runValidators: true,
  })
    const updateUser = await UserSchema.findByIdAndUpdate({_id:req.body.userId},{profilePicture:url},{
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
  }else{
    const paths = req.file.path.replace(/\\/g, "/")
    url = "https://dailer-backend.onrender.com/" + paths
    const user = await UserSchema.findByIdAndUpdate({_id:req.body.userId},{...req.body},{
      new:true,
      runValidators: true,
  })
    const updateUser = await UserSchema.findByIdAndUpdate({_id:req.body.userId},{profilePicture:url},{
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
}

const addCommentRating = async(req,res)=>{
  const user = await UserSchema.findOne({_id:req.body.userId},)
  const alreadyPostedComment=    await businessModel.findOne(  { _id: req.body.businessId, 'ratingAndComments.userId': req.body.userId },)
  if(alreadyPostedComment){
      res.status(404).json({
       msg:"sorry you have already added your comment if you want please try to update",
       statuscode:404
     })
  }else{
   addRatingAndCommetsModel = {
      userName:user.name,
      rating:req.body.rating,
      comment:req.body.comment,
      userId:req.user.userId,
      profilePicture:user.profilePicture,
      likes:[]
    }
    const update = { $push: { ratingAndComments: addRatingAndCommetsModel}};
    await businessModel.findByIdAndUpdate({_id:req.body.businessId},update)
    res.status(201).json({
    msg:"added comment and rating sucessfully",
    statusCode:201
    })
 }
  }

  const updateCommentRating = async (req, res) => {
    try {
        const business = await businessModel.findOne({ _id: req.body.businessId });
        const commentIndex = business.ratingAndComments.findIndex(
            (comment) => comment.userId.toString() === req.body.userId
        );

        if (commentIndex !== -1) {
            business.ratingAndComments[commentIndex].comment = req.body.newComment;
            business.ratingAndComments[commentIndex].rating = req.body.newRating;
            await business.save();

            res.status(200).json({
                msg: "Updated comment and rating successfully",
                statusCode: 200,
            });
        } else {
            res.status(404).json({
                msg: "Comment and rating not found for the specified user",
                statusCode: 404,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Server Error",
            statusCode: 500,
        });
    }
};


  const deleteCommentRating = async (req, res) => {
    try {
      const business = await businessModel.findOne({ _id: req.body.businessId });
  
      business.ratingAndComments = business.ratingAndComments.filter(
        (comment) => comment.userId.toString() !==req.body.userId
      );
  
      await business.save();
  
      res.status(201).json({
        msg: "Deleted comment and rating successfully",
        statusCode: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Internal Server Error",
        statusCode: 500,
      });
    }
  };
  

const likeOrRemoveLike = async(req,res)=>{

  let business =  await businessModel.findOne({ _id: req.body.businessId},)

  let comment =  business.ratingAndComments.id(req.body.commentId)

  if (req.body.likedOrNot === false) {
   
    comment.likes = comment.likes.filter((like) => like.userId === req.body.userId);
  
    await business.save();

    res.status(201).json({
    msg:"Removed Like sucessfully",
    businessDetails:business,
    statusCode:201
    })
  }else {
let like = comment.likes.find((like) => like.userId === req.body.userId);


  await comment.likes.push({_id:req.body.userId,likedOrNot:true});


await business.save();

res.status(201).json({
msg:"Liked sucessfully",
businessDetails:business,
statusCode:201
})

  }
  
}
module.exports = {updateUser,getUser,addCommentRating,likeOrRemoveLike,deleteCommentRating,updateCommentRating}







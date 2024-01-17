const { StatusCodes } = require('http-status-codes');
const postSchema = require('../models/post-model')
const businessSchema = require('../models/business-model')
const UserSchema = require('../models/auth-model')


const getAllPostsByLocation = async(req,res)=>{
    const  post = await postSchema.find({location:req.body.location})
    res.status(StatusCodes.OK).json({
        data:post,
    });
}


const createPost = async (req, res) => {
  const businessUser = await businessSchema.find({_id:req.body.businessUserId});

  const paths = req.file.path.replace(/\\/g, "/")
  url = "https://dailer-backend.onrender.com/" + paths

        const post = await postSchema.create({
          postPicture:url,
          businessPic:businessUser[0].businessProfilePhoto,
          businessName:businessUser[0].businessName,
          businessPhoneNumber:businessUser[0].phoneNum1,
          location: req.body.location,
          heading: req.body.heading,
          description: req.body.description,
        });
  
       const updatePost = await postSchema.findByIdAndUpdate({_id:post._id},{postPicture: url},{
               new:true,
               runValidators: true,
           })

  res.status(StatusCodes.CREATED).json({post:post})
  }

const updatePost = async(req,res)=>{
        const post = await postSchema.findByIdAndUpdate({_id:req.body.postId},{...req.body},{
            new:true,
            runValidators:true,
        })
        if(post){
            res.status(200).json({post});
        }
}

const deletePost = async(req,res)=>{
  const post = await postSchema.findByIdAndDelete({_id:req.body.postId})
if(post){
    res.status(200).json({ msg:"Post Deleted SucessFully",});
}
res.status(404).json({ msg:"something went wrong",});
}


const addPostComment = async(req,res)=>{
    const user = await UserSchema.findOne({_id:req.body.userId},)
    const alreadyPostedComment=    await postSchema.findOne(  { _id: req.body.postId, 'comments.userId': req.body.userId },)
    if(alreadyPostedComment){
        res.status(404).json({
         msg:"sorry you have already added your comment if you want please try to update",
         statuscode:404
       })
    }else{
     commentsModel = {
        userName:user.name,
        comment:req.body.comment,
        userId:req.body.userId,
        profilePicture:user.profilePicture,
      }
      const update = { $push: { comments: commentsModel}};
      await postSchema.findByIdAndUpdate({_id:req.body.postId},update)
      res.status(201).json({
      msg:"added comment and rating sucessfully",
      statusCode:201
      })
   }
    }
  
    const updatePostComment = async (req, res) => {
      try {
          const post = await postSchema.findOne({ _id: req.body.postId });
          const commentIndex = post.comments.findIndex(
              (comment) => comment.userId.toString() === req.body.userId
          );
  
          if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.newComment;
              await post.save();
  
              res.status(200).json({
                  msg: "Updated comment successfully",
                  statusCode: 200,
              });
          } else {
              res.status(404).json({
                  msg: "Comment not found for the specified user",
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
  
  
    const deletePostComment= async (req, res) => {
      try {
        const post = await postSchema.findOne({ _id: req.body.postId });
    
        post.comments = post.comments.filter(
          (comment) => comment.userId.toString() !== req.body.userId
        );
    
        await post.save();
    
        res.status(201).json({
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
    
  
  const likePostOrRemoveLike = async(req,res)=>{
  
    let post =  await postSchema.findOne({ _id: req.body.postId},)
  

  
    if (req.body.likedOrNot === false) {
     
      post.likes = post.likes.filter((like) => like.userId === req.body.userId);
    
      await post.save();
  
      res.status(201).json({
      msg:"Removed Like sucessfully",
      postDetails:post,
      statusCode:201
      })
    }else {
  let like = post.likes.find((like) => like.userId === req.body.userId);
  
  
    await post.likes.push({_id:req.body.userId,likedOrNot:true});
  
  
  await post.save();
  
  res.status(201).json({
  msg:"Liked sucessfully",
  postDetails:post,
  statusCode:201
  })
  
    }
    
  }



module.exports = {getAllPostsByLocation,createPost,updatePost,deletePost,addPostComment,updatePostComment,deletePostComment,likePostOrRemoveLike}
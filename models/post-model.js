const {addRatingAndComments,postComments} = require('./addRatingAndComments-model')
const mongoose = require('mongoose')
const likeOrRemoveLike = require('./likeOrRmoveLike-model')
const postSchema = mongoose.Schema({
// posts according to location wide,

location:{
    type:String
},
// postImage,
postPicture:{
    type:String,
},
// heading,
heading:{
    type:String,
},
// description,
description:{
    type:String,
},
// BusinessUserId,
businessUserId:{
    type:String,
},
// businessPic,
businessPic:{
    type:String,
},
// businessName,
businessName:{
    type:String,
},
// businessPhoneNumber,
businessPhoneNumber:{
    type:String,
},

// comments,
comments:{
    type:[postComments]
},
//likes
likes:[likeOrRemoveLike]
// chat,1-1

}) 

module.exports = mongoose.model('postSchema',postSchema)
const mongoose = require('mongoose')
const likeOrRemoveLike = require('./likeOrRmoveLike-model')
const addRatingAndComments = new mongoose.Schema({
    userName:{
        type:String,
    },
    rating:{
        type:Number,
    },
    comment:{
        type:String,
    },
    userId:{
        type:String
    },
    profilePicture:{
        type:String,
    },
    likes:[likeOrRemoveLike]
},
{ timestamps: true })

module.exports = addRatingAndComments


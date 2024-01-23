var mongoose = require('mongoose');
const messageSchema =  mongoose.Schema({
    expireAt: {
           type: Date,
           default: Date.now,
           index: { expires:30 * 24 * 60 * 60,},
         },
   sender_id:{
           type:String,
       },
   message:{
       type:String,
   },
images:[String],
title:{
    type:String,
},
description:{
    type:String,
},
intrested:[String],
})   


const userDetails =  new mongoose.Schema({
    name:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    image:{
        type:String
    },
    userId:{
        type:String
    },
    userType:{
        type:String,
    }
})

const groupModel = new mongoose.Schema({
    groupName:{
        type:String
    },
    description:{
        type:String
    },
    groupImage:{
        type:String
    },
    groupMembers:[userDetails],
    messages:[messageSchema]
    
})

module.exports = mongoose.model('groups',groupModel);
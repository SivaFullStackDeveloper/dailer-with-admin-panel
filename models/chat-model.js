const mongoose = require('mongoose')
const messageSchema = require('../models/chat-schema')
const chatSchema = new mongoose.Schema({
userId:{
    type:String,
},

businessUserId:{
    type:String,
},
userImage:{
    type:String,
},
businessUserImage:{
    type:String,
},

userName:{
    type:String,
},
businessUserName:{
    type:String,
},

messages:[messageSchema],
}) 

module.exports = mongoose.model('chatSchema', chatSchema)
const mongoose = require('mongoose')

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
seen: { type: Boolean, default: false },

    
 }) 

 module.exports  = messageSchema
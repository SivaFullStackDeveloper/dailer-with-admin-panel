const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please Provide company Name"],
        maxLength :50,
    },
    position:{
        type:String,
        required:[true,"Please Provide Position "],
        maxLength :100,
    },
    company:{
        type:String,
        required:[true,"Please Provide company name"],
        
    },

    status:{
        type:String,
        enum:["Interview","pending","declined",],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"Please Provide user"],
    },
},{
    
timestamps:true
}
)

module.exports = mongoose.model('Jobs',JobSchema)
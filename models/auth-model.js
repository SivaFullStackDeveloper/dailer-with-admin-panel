const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const UserSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true, "Please Provide Name"],
    },
    jobTitle:{
        type:String,
     
    },
    companyName:{
        type:String,
    
    },
    password:{
        type:String,
        required:[true, "Please Provide Password"],
        minLength:8,
    
    },
    email:{
        type:String,
        required:[true, "Please Provide email "],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,"Please provide valid email "],
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:[true, "Please Provide Number"],
        unique:true,
    },

    alternateNumber:{
        type:String,
    },
    webLink:{
        type:String,
    },
    city:{
        type:String,
        required:[true, "Please Provide city"],
    },
    district:{
        type:String,
        required:[true, "Please Provide district"],
    },
    state:{
        type:String,
        required:[true, "Please Provide state"],
    },
    pinCode:{
        type:String,
        required:[true, "Please give pin code"],
    },
    type: {
        type: String,
        default: "user",
      },
      profilePicture:{
        type:String,
      },
      businessRegister:{
        type:Boolean,
        default:false,
      },
    },
     { timestamps: true }
);


UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.createJwt = function (id,name){
    return jwt.sign({userId:id,name:name},process.env.JWT_PASSWORD,)
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatched = await bcrypt.compare(candidatePassword,this.password)
    return isMatched
}

module.exports = mongoose.model('User',UserSchema)



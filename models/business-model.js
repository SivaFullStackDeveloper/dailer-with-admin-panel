const mongoose = require('mongoose')


const businessDetailsSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true, "Please Provide userid"],
    },
        businessName:{
            type:String,
            required:[true, "Please Provide businessName"],
        },
        mailId:{
            type:String,
   
        },
        phoneNum1:{
            type:String,
            required:[true, "Please Provide phoneNum1"],
        },
        phoneNumAlternative:{
            type:String
        },
        district:{
            type:String
        },
        cityName:{
            type:String
        },
        stateName:{
            type:String
        },
        address:{
            type:String,
            required:[true, "Please Provide address"],
        },
        category:{
            type:String,
            required:[true, "Please Provide category"],
        },
        subcategories:{
            type:String,
            required:[true, "Please Provide sub categories"],
        },
        PinCode:{
            type:String,
            required:[true, "Please Provide PinCode"],
        },
        isLoggedIn :{
            type:String
        },
        WebLink :{
            type:String
        },
        businessCoverPhoto:{
            type:String
        },
        businessProfilePhoto:{
            type:String
        },
        businessGallery:[String],
        comments:{
            type:String
        },
        rating:{
            type:String
        },
        reviews:{
            type:String
        },
        paymentsAccepted:{
            type:String,

        },
        yearOfEstablishment:{
            type:String,
    
        },
        businessAboutUs:{
            type:String,

        },    
        workingHours:{
            type:String,
            required:[true, "Please Provide working Hours"],
        },
        keyWords:{
            type:String,

        },
        location:{
            type:String,
            required:[true, "Please Provide location"],
        },
        socialMediaLink:{
            type:String
        },
        languageSpoken:{
            type:String,
           
        },
        parkingAvilbility:{
            type:String,

        },
        videoTestimons:{
            type:String
        },
        numberOfStaff:{
            type:String
        },
        achivementsAwards:{
            type:String
        },
        fastResponseTime:{
            type:Number,
            default:0,
        },
        currentResponseTime:{
            type:Number,
            default:0,
        },
        getDicrection:{
            type:String,
        },
        verified:{
            type:Boolean,
            default:true,
        },
        holidays:{
            type:[String],
        }
})


module.exports = mongoose.model('businessDetailsSchema',businessDetailsSchema)

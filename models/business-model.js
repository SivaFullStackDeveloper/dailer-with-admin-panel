const mongoose = require('mongoose')
const {addRatingAndComments,postComments} = require('./addRatingAndComments-model')


const businessDetailsSchema = new mongoose.Schema({
    viwersCount:{
        type:Number,
        default:0,
    },
    userId:{
        type:String,
        required:[true, "Please Provide userId"], 
    },
    businessName:{
            type:String,
            required:[true, "Please Provide businessName"],
        },
        mailId:{
            type:String,
            default:""
   
        },
        phoneNum1:{
            type:String,
            required:[true, "Please Provide phoneNum1"],
        },
        phoneNumAlternative:{
            type:String,
            default:""
        },
        district:{
            type:String,
            default:""
        },
        cityName:{
            type:String,
            default:""
        },
        stateName:{
            type:String,
            default:""
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
            type:String,
            default:""
        },
        WebLink :{
            type:String,
            default:""
        },
        businessCoverPhoto:{
            type:String,
            default:""
        },
        businessProfilePhoto:{
            type:String,
            default:""
        },
        businessGallery:[String],
        rating:{
            type:Number,
            default:0,
        },
        
        premiumAccountOrNot:{
            type:Boolean
        },
        paymentsAccepted:{
            type:String,
            default:""
        },
        yearOfEstablishment:{
            type:String,
            default:""
    
        },
        businessAboutUs:{
            type:String,
            default:""

        },    
        workingHours:{
            type:String,
            required:[true, "Please Provide working Hours"],
        },
        keyWords:{
            type:String,
            default:""

        },
        location:{
            type:String,
            required:[true, "Please Provide location"],
        },
        socialMediaLink:{
            type:String,
            default:""
        },
        languageSpoken:{
            type:String,
            default:""
           
        },
        parkingAvilbility:{
            type:String,
            default:""

        },
        videoTestimons:{
            type:String,
            default:""
        },
        numberOfStaff:{
            type:String,
            default:""
        },
        achivementsAwards:{
            type:String,
            default:""
        },
        fastResponseTime:{
            type:String,
            default:'0',
        },
        currentResponseTime:{
            type:Number,
            default:'0',
        },
        getDicrection:{
            type:String,
            default:""
        },
        verified:{
            type:Boolean,
            default:true,
        },
        holidays:{
            type:[String],
            default:""
        },
        ratingAndComments:{
            type:[addRatingAndComments]
        }
})


module.exports = mongoose.model('businessDetailsSchema',businessDetailsSchema)

const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
    state:{
        type:String,
    },
    district:{
        type:String,
    },
    city:{
        cityName:{
            type:String,
        },
        mandal:{
            type:String,
        },
        village:{
            type:String,
        },
    },
    metroCity:{
        metroCityName:{
            type:String,
        },
        subcity :{
            type:String,
        }
    },
})

module.exports = mongoose.model('citiesSchema',citiesSchema)
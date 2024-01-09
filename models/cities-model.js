const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
        metropolitianCities:{
        type:String,
        required:[true,"Please Provide Metropolitian Cities"],
    },
    subcities:{
        type:String,
        required:[true,"Please Provide sub city"],
    },
})

module.exports = mongoose.model('citiesSchema',citiesSchema)
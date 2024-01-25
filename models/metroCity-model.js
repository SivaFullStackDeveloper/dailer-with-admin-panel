const mongoose = require('mongoose')

const metroCitySchema = new mongoose.Schema({
    metroCity:{
        type:String,
    },
    subCity:{
         type:String,
        },
       
})

module.exports = mongoose.model('metroCitySchema',metroCitySchema)
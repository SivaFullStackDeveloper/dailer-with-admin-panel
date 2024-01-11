const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:[true,"Please Provide category Name"],
        maxLength :50,
    },
    subCategory:{
        type:String,
        required:[true,"Please Provide subCategory "],
        maxLength :100,
    },
    keyWords:{
        type:String,
    },
})

module.exports = mongoose.model('categoriesSchema',categoriesSchema)
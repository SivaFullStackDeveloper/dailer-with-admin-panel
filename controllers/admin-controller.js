require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')


const registerUserCount = async(req,res)=>{

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const userCount = await UserSchema.find({createdAt: {$gte: today}})
    console.log(userCount)

    res.status(200).json({
        todayUserRegistred:userCount,
        "statusCode":StatusCodes.OK
    })
}

module.exports = registerUserCount
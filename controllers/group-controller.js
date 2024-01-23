require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const groupModel = require('../models/group-model')
const { BadRequestError } = require('../error/bad-request')


const removeuserFromGroup = async(req,res)=>{
const group = await groupModel.findOne({groupName:req.body.groupName})
group.groupMembers = group.groupMembers.filter(
    (groupMember) => groupMember.phoneNumber.toString() !== req.body.phoneNumber
  );
  await group.save();
  res.status(200).json({
    msg:"user removed from the group sucessfully",
    sucess:true,

  })
}

const getGroup = async(req,res)=>{
    const group = await groupModel.findOne({groupName:req.body.groupName})
      res.status(200).json({
        data:group,
        sucess:true,
      })
    }
    


module.exports = {removeuserFromGroup,getGroup}
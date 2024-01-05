const { StatusCodes } = require('http-status-codes');
const JobsSchema = require('../models/jobs-model')



const getAllJobs = async(req,res)=>{
    
    const allJobs = await JobsSchema.find({createdBy : req.user.userId})
    res.status(StatusCodes.OK).json({allJobs});
}

const getJob = async(req,res)=>{
    const {id}=req.params
    const jobs = await JobsSchema.findOne({_id:id})
    res.status(StatusCodes.OK).json({jobs});
}


const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId;
    const job = await JobsSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

  };

const updateJob = async(req,res)=>{
    res.status(200).send('updateJob api');
}

const deleteJob = async(req,res)=>{
    res.status(200).send('deleteJob api');
}




module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}
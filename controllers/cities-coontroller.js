const { StatusCodes } = require('http-status-codes');
const citiesSchema = require('../models/cities-model')




const getAllCities = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}


const createCities = async (req, res) => {
        const cities = await citiesSchema.create(req.body);
        return res.status(StatusCodes.CREATED).json({cities})       
       
  };

const updateCities = async(req,res)=>{

        const cities = await citiesSchema.findByIdAndUpdate({_id:req.params.id},{...req.body},{
            new:true,
            runValidators:true,
        })
        if(cities){
            res.status(200).json({cities});
        }

     res.status(StatusCodes.BAD_REQUEST).json({
        "msg":"something went wrong",
        statuscode:StatusCodes.BAD_REQUEST,
        success:false,
    });
}

const deleteCities = async(req,res)=>{
    const cities = await citiesSchema.findByIdAndDelete({_id:req.params.id})
    if(cities){
        return res.status(200).json({msg:'Sucessfully deleted',statuscode:200});
    }
    res.status(500).json({msg:'Something went wrong',statuscode:500});
}


const getAllStates = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}


const getAllDistricts = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}


const getAllCity = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}
const getAllMandal= async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}

const getAllVilage= async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}

module.exports = {getAllCities,createCities,updateCities,deleteCities,getAllStates,getAllDistricts,getAllCity,getAllMandal,getAllVilage}
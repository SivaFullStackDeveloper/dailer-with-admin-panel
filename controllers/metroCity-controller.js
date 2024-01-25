const { StatusCodes } = require('http-status-codes');
const metroCitySchema = require('../models/metroCity-model')
const a = require('../models/ApAndTelangana.json');




const createCities = async (req, res) => {
 
    const cities = await metroCitySchema.create(req.body);
        res.status(201).json(cities)
  };

const updateCities = async(req,res)=>{
        const cities = await metroCitySchema.findByIdAndUpdate({_id:req.params.id},{...req.body},{
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
    const cities = await metroCitySchema.findByIdAndDelete({_id:req.params.id})
    if(cities){
        return res.status(200).json({msg:'Sucessfully deleted',statuscode:200});
    }
    res.status(500).json({msg:'Something went wrong',statuscode:500});
}


const getAllCities = async(req,res)=>{
    let allCities = await metroCitySchema.find({})
   res.status(StatusCodes.OK).json({
        totalMetroCities:allCities
    });
}

const getAllSubCities = async(req,res)=>{
    console.log(req.query.metroCityName)
    let allCities = await metroCitySchema.find({metroCity:req.query.metroCityName})
    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].subCity)
    }
    var uSet = new Set(totalCities);
   res.status(StatusCodes.OK).json({
        totalSubCities:[...uSet]
    });
}


module.exports = {getAllCities,createCities,updateCities,deleteCities,getAllSubCities}
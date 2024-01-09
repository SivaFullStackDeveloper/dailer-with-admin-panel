const { StatusCodes } = require('http-status-codes');
const citiesSchema = require('../models/cities-model')



const getAllCities = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}


const createCities = async (req, res) => {
    const {metropolitianCities,subcities} = req.body
    const city = await citiesSchema.find({ metropolitianCities:`${metropolitianCities}`,subcities:`${subcities}`});
    if(city){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "msg":"sorry this category already exists",
            statuscode:StatusCodes.BAD_REQUEST,
            success:false,
        });}else{
            const cities = await citiesSchema.create(req.body);
            return res.status(StatusCodes.CREATED).json({cities})
        }

    
  };

const updateCities = async(req,res)=>{
    const {metropolitianCities,subcities} = req.body
    const cities = await citiesSchema.find({ metropolitianCities:`${metropolitianCities}`,subcities:`${subcities}`});
    if(cities){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "msg":"sorry this category already exists",
            statuscode:StatusCodes.BAD_REQUEST,
            success:false,
        });
    }else{
        const cities = await citiesSchema.findByIdAndUpdate({_id:req.body.id},{...req.body},{
            new:true,
            runValidators:true,
        })
        res.status(200).json({cities});
    }

}

const deleteCities = async(req,res)=>{
    const cities = await citiesSchema.findByIdAndDelete({_id:req.params.id})
    if(categories){
        return res.status(200).json({msg:'Sucessfully deleted',statuscode:200});
    }
    res.status(500).json({msg:'Something went wrong',statuscode:500});
}




module.exports = {getAllCities,createCities,updateCities,deleteCities}
const { StatusCodes } = require('http-status-codes');
const citiesSchema = require('../models/cities-model')
const a = require('../models/ApAndTelangana.json');



const getAllCities = async(req,res)=>{
    let allCities = await citiesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCities,
    });
}


const createCities = async (req, res) => {
    //console.log(a.length)
    //for(let i = 0;i<a.length;i++){
    //const cities = await citiesSchema.create({state:a[i].state,district:a[i].district,city:a[i].village});
    //}
    //console.log('completed');
           
    const cities = await citiesSchema.create(req.body);
        res.status(201).json(cities)
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
    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].state)
    }
    var uSet = new Set(totalCities);
   res.status(StatusCodes.OK).json({
        totalStates:[...uSet]
    });
}


const getAllDistricts = async(req,res)=>{

    let allCities = await citiesSchema.find({state:req.query.state})

    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].district)
    }
    var uSet = new Set(totalCities);
   res.status(StatusCodes.OK).json({
        totalDistricts:[...uSet]
    });
}


const getAllCity = async(req,res)=>{

    let allCities = await citiesSchema.find({district:req.query.district})
    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].city)
    }
    var uSet = new Set(totalCities);
   res.status(StatusCodes.OK).json({
        totalcities:[...uSet]
    });
}
const getAllMandal= async(req,res)=>{
    const {state} = req.query.city
    console.log(req.query)
    let allCities = await citiesSchema.find({city:req.query.city})

    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].mandal)
    }
   res.status(StatusCodes.OK).json({
        totalMandals:totalCities
    });
}

const getAllVilage= async(req,res)=>{
    let allCities = await citiesSchema.find({mandal:req.query.mandal})
    console.log(allCities)
    let totalCities = []
    for(let i = 0;i<allCities.length;i++){
        totalCities.push(allCities[i].village)
    }
   res.status(StatusCodes.OK).json({
        totalVillages:totalCities
    });
}

module.exports = {getAllCities,createCities,updateCities,deleteCities,getAllStates,getAllDistricts,getAllCity,getAllMandal,getAllVilage}
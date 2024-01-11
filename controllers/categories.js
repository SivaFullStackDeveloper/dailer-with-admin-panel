const { StatusCodes } = require('http-status-codes');
const categoriesSchema = require('../models/categories-model')



const getAllCategories = async(req,res)=>{
    let allCategories = await categoriesSchema.find({})
    res.status(StatusCodes.OK).json({
        data:allCategories,
    });
}


const createCategorie = async (req, res) => {
    const categories = await categoriesSchema.find({_id:req.params.id});
    if(categories){
        const categories = await categoriesSchema.create(req.body);
            return res.status(StatusCodes.CREATED).json({categories});}

     res.status(StatusCodes.BAD_REQUEST).json({
                "msg":"sorry this category already exists",
                statuscode:StatusCodes.BAD_REQUEST,
                success:false,
            })
        
  };

const updateCategorie = async(req,res)=>{

        const categories = await categoriesSchema.findByIdAndUpdate({_id:req.params.id},{...req.body},{
            new:true,
            runValidators:true,
        })
        if(categories){
            res.status(200).json({categories});
        }

     res.status(StatusCodes.BAD_REQUEST).json({
        "msg":"sorry this category already exists",
        statuscode:StatusCodes.BAD_REQUEST,
        success:false,
    });

}

const deleteCategorie = async(req,res)=>{
    const categories = await categoriesSchema.findByIdAndDelete({_id:req.params.id})
    if(categories){
        return res.status(200).json({msg:'Sucessfully deleted',statuscode:200});
    }
    res.status(500).json({msg:'Something went wrong',statuscode:500});
}




module.exports = {getAllCategories,createCategorie,updateCategorie,deleteCategorie}
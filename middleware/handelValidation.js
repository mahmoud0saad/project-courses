const { validationResult } = require("express-validator");
const appError = require("../utils/appError");

const handelValidation=(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=appError.create({data:errors.array(),message:"invalid data",statusCode:422});
        return next(error);
    }

    next();
}

module.exports=handelValidation;
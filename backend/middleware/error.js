const Errorhandler = require("../utils/errorhandler")




module.exports = (err,req,res,next)=>{
    err.statusCode =  err.statusCode ||500;
    err.message = err.message || "Internal server error";

    //wrong mongodb ID error
    if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`
    err=new Errorhandler(message,400);
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err= new Errorhandler(message,400)
    }

    //wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `JSON web token in invalid`
        err= new Errorhandler(message,400)
    }

    //JWT expire error
     if(err.code === "TokenExpiredError"){
        const message = `JSON web token in expired`
        err= new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}

// module.exports = (err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';

//     // In production, avoid sending sensitive information in response
//     const errorResponse = {
//         success: false,
//         message:err.message
//     };

//     // Log the error for debugging purposes
//     console.error(err);

//     res.status(statusCode).json(errorResponse);
// };
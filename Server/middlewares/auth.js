const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async(req,res,next)=>{
    try{
    // extract the token
        const token = req.cookies.token  || req.header("Authorisation").replace("bearer","")
    // validate the token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found",
            })
        }
    // verify the token
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode);
        // pass the decode  in request body in the user
        req.user = decode
    }catch(err){
        res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }
    next()
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"something went wrong while verifying the token"
        })
    }
}
// IsPatient
exports.isPatient = async(req,res,next)=>{
    try{
    // fetch the role from the token and validate the role
    if(req.user.role!=="Patient"){
        return res.status(401).json({
            sucess:false,
            message:"This is the protected route for Patient",
        })
    }
    next();
    }catch(err){
        res.status(500).json({
            success:false,
            message:"User role cannot be verified,Please try Again "
        })
    }
}
// isHospital
exports.isHospital=(req,res,next)=>{
    try{
    //fetch the token from req body and verify the token
    if(req.user.role!=="Hospital"){
        return res.status(401).json({
            success:false,
            message:"This is the protected route for Hospital"
        })
    }
    next();
    }catch(err){
        res.status(500).json({
            success:false,
            message:"User role cannot be verified,Please try again"
        })
    }
}
// isAdmin
exports.isAdmin=(req,res,next)=>{
    try{
    // fetch the token from req.body and verify the token for role
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for Admin"
            })
        }
        next();
    }catch(err){
        res.status(500).json({
            success:false,
            message:"User role cannot be verified,Please try again"
        })
    }
}
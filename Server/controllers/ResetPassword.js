const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto")

// resetPassword Link generation and sending mail
exports.resetPasswordToken = async(req,res)=>{
    try{
    // fetch the data from reqbody
        const {email} =req.body
    // validate the data
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Please fill up Email field"
            })
        }
    // check user is present
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User with email doesn't exist"
            })
        }
    // generate the token
        const token = crypto.randomUUID();
    // update the User document with token and its expiry time
        const updatedDetails = await User.findOneAndUpdate({email},
                                                            {token:token,
                                                            resetPasswordExpiry:Date.now() + 5*60*1000},
                                                            {new:true})
    // create url
        const url = `http://localhost:3000/update-password/${token}`
    // send mail
        await mailSender(email,"password reset link",`Password reset Link${url}`)
    // return response
        res.status(200).json({
            success:true,
            message:"Password reset link send Successfully check the email"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong ,Please try Again"
        })
    }
}
// reset Password
exports.resetPassword = async(req,res)=>{
    try{
    // fetch the password,confirm password,token
        const {token,password,confirmPassword} =req.body;
    // validate
        if(!token || !password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Please fill up all the details correctly"

            })
        }
    // password matches the confirm password
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password doesn't matches the confirm password"
            })
        }
    // find user using token which we have added in user document
        const user = await User.findOne({token:token})
    // check wheather token is invalid(token will be only if wrong token or it exceed expity time)
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid token ,user with the token not found"
            })
        }
        if(user.resetPasswordExpiry>Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token is expired,Regenerate the token"
            })
        }
    // hash the password
    const hashPassword = await bcrypt.hash(password,10);
    // update in db
    await User.findOneAndUpdate({token:token},{password:hashPassword},{new:true})
    // return response
    return res.status(200).json({
        success:true,
        message:"Password reset Successfully"
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"something went wrong,Please Try Again"
        })
    }
}
const moongose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new moongose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:10*60*1000,
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse =await mailSender(email,otp);
        console.log("email send successfully");
        console.log(mailResponse);
    }catch(err){
        console.log("error sending email");
        console.log(err);
    }
}
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next();
})


module.exports = moongose.model("OTP",otpSchema)
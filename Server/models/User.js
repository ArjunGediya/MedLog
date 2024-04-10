const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    aadharNumber:{
        type:String,
    },
    licenseNumber:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Hospital","Patient"],
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:String,
    },
    gender:{
        type:String,
    },
    bloodGroup:{
        type:String,
    },
    taluka:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    MedicalData:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MedicalData",
    }],
    // for reset password functionality
    token:{
        type:String,
    },
    resetPasswordExpiry:{
        type:Date,
    }
})

module.exports = mongoose.model("User",userSchema)
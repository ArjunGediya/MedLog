const mongoose = require("mongoose")

const aadharSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    aadharNumber:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    taluka:{
        type:String,
        required:true,
        trim:true,
    },
    district:{
        type:String,
        required:true,
        trim:true,
    },
    state:{
        type:String,
        required:true,
        trim:true,
    },
    contactNumber:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    }
})

module.exports = mongoose.model("AadharDetails",aadharSchema)
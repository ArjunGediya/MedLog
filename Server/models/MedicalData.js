const mongoose = require("mongoose")
const mailSenderforFile = require("../utils/mailSenderforFile")
const User = require("../models/User")

const medicalSchema = new mongoose.Schema({
    diseaseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    Date:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    diagonsedByDoctor:{
        type:String,
        required:true,
        trim:true,
    },
    diagonsedByHospital:{
        type:String,
    },
    fileurl:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
try{
    medicalSchema.post("save",async(doc)=>{
    // fetch the patient email from its id and hospital name from its id
        const patientInfo = await User.findById(doc.user);
     //sending mail after the record of medical data is created
        await mailSenderforFile(patientInfo.email,doc.diagonsedByDoctor,doc.diagonsedByHospital)
    })
    
}catch(err){
    console.log(err);
}
module.exports = mongoose.model("MedicalData",medicalSchema)
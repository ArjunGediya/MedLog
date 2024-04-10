const User = require("../models/User")

exports.ReadMedicalDataPatient = async(req,res)=>{
    try{
    // fetch the data from req.body from decode tocken in user
    const patientId= req.user.id;
    console.log(patientId);
    // get all details of patient 
        const patientInfo = await User.findById(patientId).populate("MedicalData").exec();
        console.log(patientInfo);
    // return response
        return res.status(200).json({
            success:true,
            message:"patient information fetched successfully",
            patientInformation:patientInfo,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Not able to fetch patient medical data Please try again"
        })
    }

}
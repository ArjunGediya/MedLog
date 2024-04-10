const User = require("../models/User");
const MedicalData = require("../models/MedicalData");
const cloudinary = require("cloudinary").v2;

exports.CreateMedicalData = async (req, res) => {
  
  try {
    // fetch the data from token we have decode and put in request body by the name user and all data necessary data
    const userID = req.user.id;
    console.log(userID);
    const userName = req.user.name
    // here we our input field must have patientAdharcard,disesaseDescription,diagonisedbydoctor
    const { patientAadharNumber, diseaseDescription, diagonsedByDoctor } =
      req.body;
    
    // console.log(pdfFile);
    // file
    const pdfFile = req.files.pdfFile;
    // console.log("pdf: "+req.files);
    // validations
    if (
      !patientAadharNumber ||
      !diseaseDescription ||
      !diagonsedByDoctor ||
      !pdfFile
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill up the all details correctly",
      });
    }
    const supportedTypes = ["pdf"];
    const fileType = `${pdfFile.name.split(".")[1].toLowerCase()}`;
    console.log("filetype -->", fileType);
    if (!supportedTypes.includes(fileType)) {
      res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    // file format is valid so entry in cloudinary
    console.log("tempfilepath", pdfFile.tempFilePath);
    const options = {
      resource_type: "raw",
      pages: true, // Automatically determine the file type
      folder: "MedicalData", // Optional: specify a folder in Cloudinary to store the file
    };
    console.log(options);
    const cloudinarypdfUploadResponse = await cloudinary.uploader.upload(
      pdfFile.tempFilePath,
      options
    );
    const link = cloudinarypdfUploadResponse.secure_url;
    console.log("link fo pdfFile", link);

    // take patient from patientAadharNumber
    const patient = await User.findOne({ aadharNumber: patientAadharNumber });
    console.log(patient);
    // if patient doesn't exist
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found with the provided Aadhar number",
      });
    }
    //Upload in medicaldata db
    const newMedicalData = new MedicalData({
      diseaseDescription,
      diagonsedByDoctor,
      diagonsedByHospital: userName,
      fileurl: link,
      user: patient._id,
    });
    const savedMedicalData = await newMedicalData.save();
    // update in user(Patient) database
    const updatedPatient = await User.findByIdAndUpdate(
      patient._id,
      { $push: { MedicalData: savedMedicalData._id } },
      { new: true }
    )
      .populate("MedicalData")
      .exec();
    // send response
    res.status(200).json({
      success: true,
      updatedPatient,
      message: "MedicalData creaated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error creating the medicalData please try after sometime",
      error: err.message,
    });
  }
};

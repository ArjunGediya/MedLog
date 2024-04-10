const User = require("../models/User");

exports.ReadMedicalDataHospital = async (req, res) => {
  try {
    // fetch the data from req.body
    const { patientAadharcardNumber } = req.query;
    // validate
    if (!patientAadharcardNumber) {
      return res.status(401).json({
        success: false,
        message: "Pleae enter up the details correctly",
      });
    }
    // get all details of patient
    const patientInfo = await User.find({
      aadharNumber: patientAadharcardNumber,
    })
      .populate("MedicalData")
      .exec();
    // if user with given aadhar number don't exist
    if (!patientInfo) {
      return res.status(401).json({
        success: false,
        message: "User with entered Aadhar number don't exist ",
      });
    }
    // return response
    return res.status(200).json({
      success: true,
      message: "patient information fetched successfully",
      patientInformation: patientInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Not able to fetch patient medical data Please try again",
    });
  }
};

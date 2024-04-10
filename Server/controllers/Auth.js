const AadharDetails = require("../models/AadharDetails");
const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

// sendOTPfor Patient
exports.sendOTPPatient = async (req, res) => {
  try {
    // fetch the details from request
    const { aadharNumber } = req.body;

    console.log("INSIDE SEND OTP", aadharNumber);

    const aadharUser = await AadharDetails.findOne({ aadharNumber });
    if (!aadharUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid Aadhar Number",
      });
    }
    const email = aadharUser.email;
    // check if the patient exist or not
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }
    // otp generation
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    // otp is unique is not
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    console.log("otp generated", otp);
    // create entry of otp in db
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    // if all goes on and on send the response
    res.status(200).json({
      success: true,
      message: "otp sent succesfully",
      otp,
    });
  } catch (err) {
    console.log("error sending the otp");
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// send OTPHospital
exports.sendOTPHospital = async (req, res) => {
  try {
    // fetch the details from request
    const { email } = req.body;
    // otp generation
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    // otp is unique is not
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    console.log("otp generated", otp);
    // create entry of otp in db
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    // if all goes on and on send the response
    res.status(200).json({
      success: true,
      message: "otp sent succesfully",
      otp,
    });
  } catch (err) {
    console.log("error sending the otp");
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// signup
exports.signUpPatient = async (req, res) => {
  try {
    // fetch the data from request
    const { aadharNumber, password, confirmPassword, bloodGroup, otp } =
      req.body;

    console.log(aadharNumber, password, confirmPassword, bloodGroup, otp);

    // validations
    if (!aadharNumber || !password || !confirmPassword || !bloodGroup || !otp) {
      return res.status(401).json({
        success: false,
        message: "Please fill up all the details properly",
      });
    }
    // check wheather both the password matches
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password doesn't matches confirm password",
      });
    }
    // check if the user with the adhaarcardnumber exist
    const aadharUser = await AadharDetails.findOne({ aadharNumber });
    if (!aadharUser) {
      return res.status(401).json({
        success: false,
        message:
          "user with the provided Aadhar number don't exist in aadhar database",
      });
    }
    // check patient already registered
    const existingUser = await User.findOne({ aadharNumber });

    if (existingUser) {
      return res.status(401).json({
        success: true,
        message: "Patient already registered",
      });
    }
    // email of patient fetched from aadharcard details
    const email = aadharUser.email;
    //find most recent otp
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recent otp", recentOtp);
    console.log(recentOtp[0].otp);
    // compare otp recevied from req and recent otp
    if (recentOtp.length == 0) {
      return res.status(500).json({
        succes: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTp",
      });
    }

    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // entry in db
    const newPatient = await User.create({
      name: aadharUser.name,
      aadharNumber,
      password: hashPassword,
      role: "Patient",
      dateOfBirth: aadharUser.dateOfBirth,
      gender: aadharUser.gender,
      taluka: aadharUser.taluka,
      district: aadharUser.district,
      state: aadharUser.state,
      bloodGroup: bloodGroup,
      contactNumber: aadharUser.contactNumber,
      email: aadharUser.email,
    });
    // send response
    res.status(200).json({
      succes: true,
      message: "Patient registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Patient cannot be registered,Please try Again",
    });
  }
};

exports.signUpHospital = async (req, res) => {
  try {
    // fetch the data from request
    const {
      licenseNumber,
      name,
      password,
      confirmPassword,
      contactNumber,
      email,
      otp,
      taluka,
      district,
      state,
    } = req.body;

    console.log(
      licenseNumber,
      name,
      password,
      confirmPassword,
      contactNumber,
      email,
      otp,
      taluka,
      district,
      state
    );

    // validations
    if (
      !licenseNumber ||
      !name ||
      !password ||
      !confirmPassword ||
      !taluka ||
      !district ||
      !state ||
      !contactNumber ||
      !email ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill up all the details properly",
      });
    }
    // check wheather both the password matches
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password doesn't matches confirm password",
      });
    }
    // check hospital already registered
    const existingUser = await User.findOne({ licenseNumber });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Hospital  already registered",
      });
    }
    //find most recent otp
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recent otp", recentOtp);
    console.log(recentOtp[0].otp);
    // compare otp recevied from req and recent otp
    if (recentOtp.length == 0) {
      return res.status(500).json({
        succes: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTp",
      });
    }

    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // entry in db
    const newHospital = await User.create({
      name,
      licenseNumber,
      password: hashPassword,
      role: "Hospital",
      taluka,
      district,
      state,
      contactNumber,
      email,
    });
    // send response
    res.status(200).json({
      succes: true,
      message: "Hospital registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Hospital cannot be registered,Please try Again",
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  const _id = req.user.id;
  console.log(req.user);
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
      message: "user get successful..",
    });
  
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "oops something went wrong please try again",
    });
  }
}

// Login
exports.login = async (req, res) => {
  try {
    // fetch  details from body
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill up all the details correctly",
      });
    }
    // check user is registered
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Patient is not registered,Please do SignUp",
      });
    }

    // generate jwt token after matching th password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        name:user.name,
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // may create a problem please refer it in future
      // user.token = token // no need
      user.password = undefined;
      // create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true,
      };
      return res.cookie("token",token,options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password ",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login failed please try again",
    });
  }
};
// change password
exports.changePassword = async (req, res) => {
  try {
    // fetch the data from req
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
    // validate all the information
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details correctly",
      });
    }
    // check wheather both newPassword and confirmNewPassword matches or not
    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "New Password doesn't matches the Confirm New Password",
      });
    }
    //

    // entry in DB  find the user and update after hashing
    const password = bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(
      { email },
      {
        password: password,
      }
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesn't exist",
      });
    }
    // sending mail for informing password has been changed
    async function sendVerificationEmail(email, password) {
      try {
        const mailResponse = await mailSender(
          email,
          "Password changed as per your request",
          password
        );
        console.log("email send successfully");
        console.log(mailResponse);
      } catch (err) {
        console.log("error sending email");
        console.log(err);
      }
    }
    await sendVerificationEmail(user.email, password);
    return res.status(200).json({
      success: true,
      message: "password change successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error changing the password please try again ",
    });
  }
};

// unwnated code might be useful at some level
// exports.loginPatient= async(req,res)=>{
//     try{
//     // fetch the data from request
//         const {aadhaarCardNumber,password} = req.body
//     // validate the data
//         if(!aadhaarCardNumber || !password){
//             return res.status(401).json({
//                 success:false,
//                 message:"Please fill up all the details correctly"
//             });
//         }

//     // check user has registered or not
//         const patient = await User.findOne({aadhaarCardNumber});
//         if(!patient){
//             return res.status(401).json({
//                 success:false,
//                 message:"Patient is not registered,Please do SignUp"
//             })
//         };
//     // generate jwt,after matching the password
//         if(await bcrypt.compare(password,patient.password)){
//             const payload = {
//                 email:patient.email,
//                 id:patient._id,
//                 aadhaarCardNumber:patient.aadhaarCardNumber,
//                 role:patient.role,
//             }
//             const token = jwt.sign(payload,process.env.JWT_SECRET,{
//                 expiresIn:"1h",
//             })
//             // may create a problem
//             patient.token = token,
//             patient.password=undefined
//     // create a cookie
//             const options = {
//                 expires: new Date(Date.now() + 3*24*60*60*1000),
//                 httpOnly:true,
//             }
//             res.cookie("token",token,options).status(200).json({
//                 success:true,
//                 token,
//                 patient,
//                 message:"Patient Logged in successfully "
//             })
//         }
//         else{
//             return res.status(401).json({
//                 success:false,
//                 message:"Incorrect Password try again"
//             })
//         }
//     }catch(err){
//         console.log(err);
//         req.status(500).json({
//             success:false,
//             message:"LOGIN FAILED,Please Try again"
//         });
//     }
// }
// exports.loginHospital = async(req,res)=>{
//     try{
//     // fetch the data from req
//         const {licenceNumber,password} = req.body;

//     // validate the user
//         if(!licenceNumber || !password){
//             return res.status(401).json({
//                 success:false,
//                 message:"Please fill up all the details correctly"
//             })
//         }
//     // Find the hospital
//         const hospital = await User.findOne({licenceNumber});
//         if(!hospital){
//             return res.status(401).json({
//                 success:false,
//                 message:"Hospital is not registered,Please do SignUp"
//             })
//         }
//     // generate jwt token after matching the password
//         if(await bcrypt.compare(password,hospital.password)){
//             const payload = {
//                 email:patient.email,
//                 id:hospital._id,
//                 licenceNumber:hospital.licenceNumber,
//                 role:hospital.role,
//             }
//             const token = jwt.sign(payload,process.env.JWT_SECRET,{
//                 expiresIn:"1h"
//             })
//         // create a cookie
//         const options = {
//             expires:Date.now()+ 1000*60*60*24*3
//         }
//             res.cookie("token",token,options).status(200).json({
//                 success:true,
//                 token,
//                 hospital,
//                 message:"hospital logged in successfully"
//             })
//         }
//         else{
//             return res.status(401).json({
//                 success:false,
//                 message:"Incorrect Password"
//             })
//         }
//     }catch(err){
//         res.status(500).json({
//             sucess:false,
//             message:"invalid server error,Please try again later"
//         })
//     }
// }
// // login for admin
// exports.loginAdmin = async(req,res)=>{
//     try{
//     // fetch details from req body
//         const {email,password} = req.body;
//     // validate
//         if(!email || !password){
//             return res.status(401).json({
//                 success:false,
//                 message:"Please fill up all the Details correctly"
//             })
//         }
//     //
//     }catch(err){

//     }
// }
// exports.changePasswordHospital = async(req,res)=>{
//     const {licenceNumber,
//         oldPassword,
//         newPassword,
//         confirmNewPassword
//     } = req.body;
//     if(!licenceNumber || !oldPassword || !newPassword || !confirmNewPassword){
//         return res.status(401).json({
//             success:false,
//             message:"Please fill all the details correctly"
//         });
//     }
// // check wheather both newPassword and confirmNewPassword matches or not
//     if(newPassword!==confirmNewPassword){
//         return res.status(401).json({
//             success:false,
//             message:"New Password doesn't matches the Confirm New Password"
//         })
//     }
// //

// // entry in DB  find the user and update after hashing
//     const password = bcrypt.hash(newPassword,10);
//     const hospital = await Hospital.findByIdAndUpdate({licenseNumber},{
//         password:password,
//     })
//     if(!hospital){
//         return res.status(401).json({
//             success:false,
//             message:"hospital doesn't exist"
//         })
//     }
//     // sending mail for informing password has been changed
//     async function sendVerificationEmail(email,password){
//         try{
//             const mailResponse =await mailSender(email,"Password changed as per your request",password);
//             console.log("email send successfully");
//             console.log(mailResponse);
//         }catch(err){
//             console.log("error sending email");
//             console.log(err);
//         }
//     }
//      await sendVerificationEmail(hospital.email,password)

//     return res.status(200).json({
//         success:true,
//         message:"password change successfully"
//     })
// }

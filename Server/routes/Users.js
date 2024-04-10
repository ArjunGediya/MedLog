const express = require("express")
const router = express.Router();

const{sendOTPPatient,signUpPatient,login,changePassword}=require("../controllers/Auth")
const{resetPasswordToken,resetPassword} = require("../controllers/ResetPassword")
const { LogOut } = require("../controllers/LogOut");
const {getCurrentUser} = require("../controllers/Auth")

const {auth} =require("../middlewares/auth");



// Routes for Login,Sigup and Authentication


// router for login
router.post("/login",login)
router.get("/getUser",auth,getCurrentUser);

// router for patient signup
router.post("/signUpPatient",signUpPatient)



// router for sending otp to patient
router.post("/sendOTPPatient",sendOTPPatient)



// router for changing password
router.post("/changePassword",auth,changePassword)

// router for resetPassword token
router.post("/reset-Password-Token",resetPasswordToken)

// router for reset Password 
router.post("/reset-Password",resetPassword)

// router for logout
router.post("/logout",auth,LogOut)

module.exports =router
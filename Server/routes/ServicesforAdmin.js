const express =require("express")
const router = express.Router()

const{sendOTPHospital,signUpHospital} = require("../controllers/Auth")


const{auth,isAdmin} = require("../middlewares/auth")


// router for sending otp to hospital
router.post("/sendOTPHospital",auth,isAdmin,sendOTPHospital)


// router for hospital Signup
router.post("/signUpHospital",auth,isAdmin,signUpHospital)


module.exports = router
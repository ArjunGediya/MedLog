const express =require("express")
const router =express.Router()

const {CreateMedicalData} = require("../controllers/CreateMedicalData")
const{ReadMedicalDataHospital} =require("../controllers/ReadMedicalDataHospital")
const {BloodSearch} = require("../controllers/BloodSearch");

const{auth,isHospital} =require("../middlewares/auth")


// router for creating the data 
router.post("/CreateMedicalData",auth,isHospital,CreateMedicalData)

// router for reading medical data
router.get("/ReadMedicalData",auth,isHospital,ReadMedicalDataHospital)

// router for bloodsearch
router.get("/bloodSearch",auth,BloodSearch)

module.exports = router
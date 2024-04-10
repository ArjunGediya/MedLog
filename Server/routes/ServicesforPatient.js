const express =require("express")
const router = express.Router()

const {ReadMedicalDataPatient} = require("../controllers/ReadMedicalDataPatient")
const {BloodSearch} = require("../controllers/BloodSearch");

const {auth,isPatient} = require("../middlewares/auth")


// router for reading data
router.get("/ReadMedicalData",auth,isPatient,ReadMedicalDataPatient)

// router for bloodsearch
router.get("/bloodSearch",auth,BloodSearch)

module.exports = router
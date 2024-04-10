const express = require("express");
const app = express();
const dbconnect = require("./config/database");
const cloudinaryconnet = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;

// databaseconnection
dbconnect();
// cloudinary connection
cloudinaryconnet();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const Users = require("./routes/Users");
const ServicesforHospital = require("./routes/ServicesforHospitals");
const ServicesforPatient = require("./routes/ServicesforPatient");
const ServicesforAdmin = require("./routes/ServicesforAdmin");

// mount
app.use("/api/v1/Patient-Tracker/Hospital", ServicesforHospital);
app.use("/api/v1/Patient-Tracker/Patient", ServicesforPatient);
app.use("/api/v1/Patient-Tracker/Admin", ServicesforAdmin);
app.use("/api/v1/Patient-Tracker", Users);

// serverActivated
app.listen(PORT, () => {
  console.log(`Server Listening At Port No${PORT}`);
});

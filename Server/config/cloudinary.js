const cloudinary = require("cloudinary")
require("dotenv").config()

const cloudinaryConnet = ()=>{
    try{
         cloudinary.config({
             cloud_name:process.env.CLOUD_NAME,
             api_key:process.env.API_KEY,
             api_secret:process.env.API_SECRET,
         })
    }catch(err){
        console.error(err);
    }
}
module.exports = cloudinaryConnet;
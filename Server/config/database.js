const mongoose = require("mongoose")
const User = require("../models/User")
const bcrypt = require("bcrypt")
require("dotenv").config()
const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected succesfully");
        createAdmin()
    }).catch((err)=>{
        console.log("error connecting database");
        console.log(err);
        process.exit(1);
    })
    async function createAdmin(){
        try{
            // checking if the Admin user is present
            let user = await User.findOne({role:"Admin"})
             if(user){
                console.log("Admin is aleady present");
                return
        }
        }catch(err){
            console.log("error while reading the data for admin ",err);
        }
        // if Admin is not present create it
        try{
            user = await User.create({
                name:"Arjun Gediya",
                role:"Admin",
                password:await bcrypt.hash("abc!123",10),
                email:"abc@gmail",
                contactNumber:"123456789",
                taluka:"Mahuva",
                district:"Bhavnagar",
                state:"Gujarat"
            }) 
                console.log("admin created successfully",user);
        }catch(err){
            console.log("error creating the user");
            console.error(err);
        }
    }
}

module.exports = dbconnect;
const nodemailer = require("nodemailer")
require("dotenv").config()

const mailSender = (email,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = transporter.sendMail({
            from:`Patient tracker -by Arjun Gediya`,
            to:`${email}`,
            subject:`Verification By patient Tracker`,
            html:`
            <html>
            <head>
                <style>
                    /* CSS styles for email decoration */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                        padding: 20px;
                        text-align: center; /* Center align text */
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333333;
                    }
                    p {
                        color: #666666;
                    }
                    img {
                        display: block;
                        margin: 0 auto; /* Center align the image */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/dqrg5flbp/image/upload/v1711557914/logo_zxexh6.png" style="width: 200px;">
                    
                    <div style="text-align: center;">
                        <h2>OTP Verification Email</h2>
                        <p>Dear User,</p>
                    </div>
                    <div style="text-align: center;">
                        <p>Thank you for registering with MedLog(Patient-Tracker).To complete your registration,Please use the following OTP(One-Time Password) to verify your account:</p>
                        <h2>${body}</h2>
                        <p>This OTP is valid for 5 minutes.If you did not request for this verification,please disregard this email.Once your account is verified,you will have to access to our platform and its feature</p>
                    </div>
                </div>
            </body>
            </html>
            
            `
        });
        // ${body}
        console.log(info)
        return info;
    }catch(err){
        console.log("error sending email")
        console.log(err);
    }
}

module.exports = mailSender


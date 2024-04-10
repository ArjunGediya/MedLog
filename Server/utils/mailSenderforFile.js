const nodemailer = require("nodemailer")
require("dotenv").config()

const mailSenderforFile = (email,doctorName,hospitalName)=>{
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
            subject:`Medical file updation By patient Tracker`,
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
                        margin-bottom: 20px; /* Add margin for spacing */
                    }
                    p {
                        color: #666666;
                    }
                    img {
                        display: block;
                        margin: 0 auto; /* Center align the image */
                        margin-bottom: 20px; /* Add margin for spacing */
                    }
                    .salutation {
                        text-align: center; /* Center align the salutation */
                        margin-bottom: 20px; /* Add margin for spacing */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://res.cloudinary.com/dqrg5flbp/image/upload/v1711557914/logo_zxexh6.png" style="width: 200px;">
                    <h2>Medical Data Update Notification</h2>
                    <div class="salutation">
                        <p>Dear User,</p>
                    </div>
                    <p>We would like to inform you that your medical data has been updated.</p>
                    <p>The new medical data file was uploaded by <strong>Dr. ${doctorName}</strong> from <strong>${hospitalName}</strong>.</p>
                    <p>Please log in to your account to view the updated medical data.</p>
                    <p>If you have any concerns or questions, please don't hesitate to <a href="mailto:your@email.com">contact us</a> immediately.</p>
                </div>
            </body>
            </html>
             `
        });
        console.log(info)
        return info;
    }catch(err){
        console.log("error sending email")
        console.log(err);
    }
}

module.exports = mailSenderforFile


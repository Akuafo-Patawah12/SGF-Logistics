const nodemailer= require("nodemailer")
const tls = require('tls');
require("dotenv").config()

async function sendVerificationEmail(email, code) {
try{
    console.log(email,code)
    let transporter=nodemailer.createTransport({  //create transport allows to create communicating channel
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,//email that will be sending messages from the server to the client
                    pass: process.env.PASSWORD  //generated password form less secured apps from Google
                },
                tls: {
                    rejectUnauthorized: false, //do not reject self-signed certificates  
                  },
                })
  
    let mailOptions = {
      from: "SF Ghana Logistics",
      to: email,
      subject: "New Device Login - Verification Code",
      html: `
        <p>We noticed a login attempt from a new device or browser.</p>
        <p><strong>Your verification code is:</strong> <span style="font-size: 18px; font-weight: bold;">${code}</span></p>
        <p>If this wasn't you, please <a href="https://yourwebsite.com/security">secure your account</a> immediately.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,

      replyTo: process.env.EMAIL,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
}catch(err){
    console.log(err)
}
  }

  module.exports= sendVerificationEmail
  
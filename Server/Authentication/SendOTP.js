const nodemailer= require("nodemailer")
const tls = require('tls');
const transport = require("../Utils/MailTransporter");
require("dotenv").config()

async function sendVerificationEmail(email, code) {
try{
    console.log(email,code)
    let transporter= transport()
  
    let mailOptions = {
      from: `"SF Ghana Logistics" <${process.env.EMAIL}>`,
      to: email,
      subject: "New Device Login - Verification Code",
      html: `
        <p>We noticed a login attempt from a new device or browser.</p>
        <p><strong>Your verification code is:</strong> <span style="font-size: 18px; font-weight: bold;">${code}</span></p>
        <p>If this wasn't you, please <a href="https://sfghanalogistics.com/forget_password">secure your account</a> immediately.</p>
        <p>Best regards,<br>Your SF Ghana Logistics Ltd</p>
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
  
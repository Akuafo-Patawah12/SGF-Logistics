const nodemailer= require("nodemailer")
const tls = require('tls');
const transport = require("../Utils/MailTransporter");
require("dotenv").config()

async function contactUs(req,res) {
    const {name,email,message} = req.body.formData
try{
    console.log(name,email,message)
    let transporter= transport()
  
    let mailOptions = {
      from: `"${name} <${email}>`,
      to: process.env.EMAIL,
      subject: "Contact via sfgl website",
      text:message,
    };
  
    await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent' });
}catch(err){
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' });
}
  }

  module.exports= contactUs
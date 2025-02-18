const nodemailer = require("nodemailer");
const { text } = require("stream/consumers");
const transport = require("../Utils/MailTransporter");
require("dotenv").config()

const AskedQuestion=(req,res)=>{
    const {email,message} =req.body  // get user email from client side
    try{
                  
        let transporter= transport() 
        let mailOptions = { //How the message will look like in Gmail
            from: email,
            to: process.env.EMAIL ,  //Client email
            subject: 'Asked questions',
            text: message
            
        }; 
        
       transporter.sendMail(mailOptions, function(error, info){ //S
          if (error) {
            console.log(error);
          } else {
            console.log("success")
            res.json("valid email")
          }}); 
       
      
      
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports= AskedQuestion
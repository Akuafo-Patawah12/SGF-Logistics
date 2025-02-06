const nodemailer = require("nodemailer");
const { text } = require("stream/consumers");
require("dotenv").config()

const AskedQuestion=(req,res)=>{
    const {email,message} =req.body  // get user email from client side
    try{
                  
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
        });  
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
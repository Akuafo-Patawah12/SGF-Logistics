const nodemailer = require('nodemailer');
const tls = require('tls');
const jwt= require('jsonwebtoken');
const data=require('../DatabaseSchemas/userSchema');

const forgetPassword = async(req,res)=>{
    const {email} =req.body  // get user email from client side
    try{
        const confirm= await data.findOne({email:email}); // find one user from the database with the name in the request
        if(confirm){ 
                    
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
            from: '"Do Not Reply" <' + process.env.EMAIL + '>',
            to: email,  //Client email
            subject: 'Reset your password',
            html: `<a href="http://localhost:3000/UpdatePassword/${confirm._id}">➡️ Click this link to reset password ⬅️</a>`
        }; 
        
       transporter.sendMail(mailOptions, function(error, info){ //S
          if (error) {
            console.log(error);
          } else {
            console.log("success")
          }}); 
       res.json("valid email")
    }else{
        res.json("invalid email")  
    }    
      
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports= forgetPassword
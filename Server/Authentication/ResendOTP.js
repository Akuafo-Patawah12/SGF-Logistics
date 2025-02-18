
const data= require("../Models/UsersSchema")
require("dotenv").config()
const UAParser= require("ua-parser-js")
const transport = require("../Utils/MailTransporter");



async function resendOtp(req,res){
   
    
    const {email }= req.body.formData   //grabing user credentials from the client side.
     console.log({email})
     const userAgent = req.headers["user-agent"];
       const parser = new UAParser(userAgent);
       
       
       const deviceInfo = {
         device: parser.getDevice().model || "Unknown Device",
         brand: parser.getDevice().vendor || "Unknown Brand",
         type: parser.getDevice().type || "PC",
         os: parser.getOS().name + " " + parser.getOS().version,
         browser: parser.getBrowser().name + " " + parser.getBrowser().version,
         Agent: userAgent,
       };
       console.log(deviceInfo)
       const {device,brand,type,os,browser,Agent}=deviceInfo
     const userDeviceInfo = `${device},${brand},${type},${os},${browser},${Agent}`; // User's device info
     const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
     const otp = generateOTP();
    
// Find a user whose device_info array contains the same string

    try{


        
        const email_Exist=  await data.findOne({email:email}); /* check whether the email exist in the database 
       and store it in email exist variable */
      
        
      
       if (!email_Exist) {
        return res.status(404).json({ message: "Invalid email" }); // Email not found
          
        }
        if (email_Exist && email_Exist.device_info.includes(userDeviceInfo)) {
            console.log("Device info already exists for this user.");
          } else {
            let transporter= transport()
  
            let mailOptions = {
              from: `"SF Ghana Logistics" <${process.env.EMAIL}>`,
              to: email,
              subject: "New Device Login - Verification Code",
              html: `
                <p>We noticed a login attempt from a new device or browser.</p>
                <p><strong>Your verification code is:</strong> <span style="font-size: 18px; font-weight: bold;">${code}</span></p>
                <p>If this wasn't you, please <a href="https://yourwebsite.com/security">secure your account</a> immediately.</p>
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
            
                email_Exist.verification_code= otp
                email_Exist.code_expires_at= Date.now() + 10 * 60 * 1000  // Code expires in 10 min
                await email_Exist.save();
            return res.status(402).json({ message: "Device info doesn't exist" })
          };
        

        

        
       
        

       
    }catch(err){
        console.log(err)
       return res.status(500).json(err) //Console 500 error message if server crashes
    }}
module.exports= resendOtp
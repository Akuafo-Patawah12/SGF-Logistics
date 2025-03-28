const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const data= require("../Models/UsersSchema")
require("dotenv").config()
const UAParser= require("ua-parser-js")
const sendVerificationEmail = require("./SendOTP")
const sendCookie = require("../Utils/Cookie")


async function login(req,res){
   
    
    const {email,password,rememberMe }= req.body.formData   //grabing user credentials from the client side.
     
// Find a user whose device_info array contains the same string
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


    try{

        
 // Find a user whose device_info array contains the same string
        
        const email_Exist=  await data.findOne({email:email}); /* check whether the email exist in the database 
       and store it in email exist variable */
      
        
      
       if (!email_Exist) {
        return res.status(404).json({ message: "Invalid email" }); // Email not found
          
        }
        if (email_Exist && email_Exist.device_info.includes(userDeviceInfo)) {
            console.log("Device info already exists for this user.");
          } else {
                await sendVerificationEmail(email,otp)
            
                email_Exist.verification_code= otp
                email_Exist.code_expires_at= Date.now() + 10 * 60 * 1000  // Code expires in 10 min
                await email_Exist.save();
            return res.status(402).json({ message: "Device info doesn't exist" })
          };
        

        const password_Is_Correct = await  bcrypt.compare(password, email_Exist.password);
         

        if (!password_Is_Correct) {
            return res.status(401).json({ message: 'Invalid password' }); // Incorrect password
        }

         

         const payload = {
            id: email_Exist._id, // Example user ID
            role: email_Exist.account_type,
            iat: Math.floor(Date.now() / 1000) // Set issued at timestamp
            
          };
         const access_token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m', // create an access cookie for authorization  
        })

        
        const refresh_token= jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: rememberMe ? '30d' : '1h' // 30 days if "Remember Me" is checked, else 1 hour  
        })
        /*send refresh token to browser cookies when ever the user logs in "this determine the 
        particular user who is logged in that's what res.cookie does"*/ 
    
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "None", // Required for cross-origin requests
            path: "/",
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 30 days or 1 hour
        });
    
        const protected= email_Exist.account_type // find the user's account type "whether it's a personal or business account"

        switch (protected) {
            case "User":
                // Set the refresh token cookie
                return res.json({
                    message: "Logged in as a client",
                    accessToken: access_token
                });

            case "Admin":
               
                return res.json({
                    message: "Logged in as an admin",
                    accessToken: access_token
                });

            default:
                return res.status(400).json({ message: 'Invalid account type' }); // Unexpected account type
        }
    }catch(err){
        console.log(err)
       return res.status(500).json(err) //Console 500 error message if server crashes
    }}
module.exports={login}
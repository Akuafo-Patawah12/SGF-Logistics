const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const data= require("../Models/UsersSchema")
require("dotenv").config()

async function login(req,res){
   
    
    const {email,password,rememberMe }= req.body.formData   //grabing user credentials from the client side.
     console.log(email,password)
    try{
        const email_Exist=  await data.findOne({email:email}); /* check whether the email exist in the database 
       and store it in email exist variable */
      
        
      
       if (!email_Exist) {
        return res.status(404).json({ message: "Invalid email" }); // Email not found
          
        }

        const password_Is_Correct = await  bcrypt.compare(password, email_Exist.password);
       
         const protected= email_Exist.account_type // find the user's account type "whether it's a personal or business account"

         const payload = {
            id: email_Exist._id, // Example user ID
            iat: Math.floor(Date.now() / 1000) // Set issued at timestamp
            
          };
         const access_token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m', // create an access cookie for authorization  
        })

        function sendCookie(){
            // create refresh token
            const refresh_token= jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: rememberMe ? '30d' : '1h' // 30 days if "Remember Me" is checked, else 1 hour  
            })
            /*send refresh token to browser cookies when ever the user logs in "this determine the 
            particular user who is logged in that's what res.cookie does"*/ 

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,   // Ensures that the cookie is only accessible via HTTP(S) requests
                path: '/',        // Specifies the path for which the cookie is valid
                secure: true,          // Indicates that the cookie should only be sent over HTTPS
                sameSite: 'Strict',      // Specifies same-site cookie attribute to prevent cross-site request forgery
                maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 30 days or 1 hour
        });   
        }
       
        if (!password_Is_Correct) {
            return res.status(401).json({ message: 'Invalid password' }); // Incorrect password
        }

        switch (protected) {
            case "User":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as a client",
                    accessToken: access_token
                });

            case "Admin":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as an admin",
                    accessToken: access_token
                });

            default:
                return res.status(400).json({ message: 'Invalid account type' }); // Unexpected account type
        }
    }catch(err){
       return res.status(500).json(err) //Console 500 error message if server crashes
    }}
module.exports={login}
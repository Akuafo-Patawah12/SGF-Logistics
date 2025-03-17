const jwt = require("jsonwebtoken")
require("dotenv").config()

async function sendCookie(payload,rememberMe,res){
    // create refresh token
    try{
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

}catch(err){
    console.err("Error sending cookies")
}
     
}


module.exports= sendCookie
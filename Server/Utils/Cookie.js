const jwt = require("jsonwebtoken")
require("dotenv").config()

function sendCookie(payload,rememberMe,res){
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


module.exports= sendCookie
const nodemailer = require('nodemailer');
const tls = require('tls');
const jwt= require('jsonwebtoken');
const data=require('../Models/userSchema');

const forgetPassword = async(req,res)=>{
    const {email} =req.body  // get user email from client side
    try{
        const confirm= await data.findOne({email:email}); // find one user from the database with the name in the request
        
 
    if (!confirm) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    confirm.passwordResetToken = resetToken;
    confirm.passwordResetExpiration = Date.now() + 300000; // Token valid for 1 hour
    await user.save();
        
     
                    
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
            })
          
        let mailOptions = { //How the message will look like in Gmail
            from: '"Do Not Reply" <' + process.env.EMAIL + '>',
            to: email,  //Client email
            subject: 'Reset your password',
            html: `
            <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #333;">Reset Your Password</h2>
              <p style="color: #555;">Click the button below to reset your password:</p>
              <a href="http://localhost:3000/UpdatePassword/${resetToken}" 
                 style="background-color: #007bff; color: #fff; padding: 12px 20px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;
                        font-size: 16px; font-weight: bold;">
                Reset Password
              </a>
              <p style="color: #777; margin-top: 10px;">If you didn’t request a password reset, you can ignore this email.</p>
            </div>
          `,
            replyTo: process.env.EMAIL,
        }; 
        
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong, please try again' });
      }
}

module.exports= forgetPassword
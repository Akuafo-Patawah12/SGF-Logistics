const user= require("../Models/UsersSchema")
const {hash} = require("bcrypt")


const updatePassword= async(req,res)=>{
   const {  newPassword } = req.body;
   const { token } = req.params;
  console.log({ newPassword, token })

  try {
    // Find the user with the reset token
    const User = await user.findOne({ passwordResetToken: token });

    if (!User) {
      return res.status(404).json({ message: 'Invalid or expired reset token' });
    }

    // Check if the token has expired
    if (Date.now() > User.passwordResetExpiration) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    // Update the user's password
    User.password = hashedPassword;
    User.passwordResetToken = null; // Clear the reset token
    User.passwordResetExpiration = null; // Clear expiration time
    await User.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }

}

module.exports=  updatePassword
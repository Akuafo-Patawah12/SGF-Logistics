const bcrypt = require("bcrypt");
const users = require("../DatabaseModels/UsersSchema");

const SignUp= (socket)=>{
    
        socket.on("signing_up",async(data,callback)=>{
            const {username,email,password,account_type}= data;
            console.log(username,email,password,account_type)
            try{
                  const encrypted_password= await bcrypt.hash(password,10)
                  const finduser= await users.findOne({email:email})

                  if(!finduser){
                    return callback({success:false,message:"email does not exit"})
                  }
                  
                  const user= new users(
                    {
                        username,
                        email,
                        password: encrypted_password,
                        account_type
                    }
                  )

                  await user.save()
                  callback({success:true,message:"signed up successfull"})
                  

            }catch(error){
               console.log("sign up failed",error)
               callback({ success: false, message: 'An error occurred during signup' });
            }

            
        })

        return socket
    
}

module.exports= SignUp
const bcrypt = require("bcrypt");
const users = require("../DatabaseModels/UsersSchema");

const SignUp= (socket)=>{
    
        socket.on("signing_up",async(data,callback)=>{
            const {username,email,password,account_type}= data;
            try{
                  const encrypted_password= await bcrypt.hash(password,10)
                  const finduser= await users.findOne({email:email})

                  if(!finduser){
                    return callback({status:"error",message:"email does not exit"})
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
                  callback({status:"success",message:"signed up successfull"})
                  

            }catch(error){
               console.log("sign up failed",error)
            }

            
        })

        return socket
    
}

module.exports= SignUp
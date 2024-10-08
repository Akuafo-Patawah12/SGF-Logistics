const bcrypt = require("bcrypt");
const users = require("../DatabaseModels/UsersSchema");

const SignUp= async(req,res)=>{
    
        
            const {username,email,password,account_type}= req.body.formData;
            console.log(username,email,password,account_type)
            try{
                  const encrypted_password= await bcrypt.hash(password,10)
                  const finduser= await users.findOne({email:email})

                  if(finduser){
                    return res.status(403).json({message:"email already exit"})
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

                  return res.json({message:"Signed up successful"})
                  
                  

            }catch(error){
               console.log("sign up failed",error)
               res.status(500).json({message:"internal server error",error})
               
            }

            
        
 
    
}

module.exports= SignUp
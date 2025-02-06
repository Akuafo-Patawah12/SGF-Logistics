const bcrypt = require("bcrypt");
const UAParser = require("ua-parser-js");
const users = require("../Models/UsersSchema");


const SignUp= async(req,res)=>{
    
  const userAgent = req.headers["user-agent"];
  const parser = new UAParser(userAgent);
  
  const deviceInfo = {
    device: parser.getDevice().model || "Unknown Device",
    brand: parser.getDevice().vendor || "Unknown Brand",
    type: parser.getDevice().type || "PC",
    os: parser.getOS().name + " " + parser.getOS().version,
    browser: parser.getBrowser().name + " " + parser.getBrowser().version,
    userAgent: userAgent,
  };
  console.log(deviceInfo)
            const {username,email,password,account_type}= req.body.formData;
           
            try{
                  
                  const finduser= await users.findOne({email:email})

                  if(finduser){
                    return res.status(403).json({message:"email already exit"})
                  }
                  const encrypted_password= await bcrypt.hash(password,10)
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
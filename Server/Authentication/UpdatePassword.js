const user= require("../DatabaseModels/UsersSchema")
const {hash} = require("bcrypt")


const updatePassword= async(req,res)=>{
   try{
    const id = req.body.params
      const password = req.body
      const encrypted_password= await hash(password,10)

      const getPassword= await user.findByIdAndUpdate(id,{password:encrypted_password},{new:true})
      if(!getPassword){
         return res.status(404).json({message:"no user found"})
      }
      return res.status(200).json({message:"password updated"})

   }catch(error){
      console.log(error)
      res.status(501).json({message:"Server error at -updatePassword-"})
   }

}

module.exports=  updatePassword
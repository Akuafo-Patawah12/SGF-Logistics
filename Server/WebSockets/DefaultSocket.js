const getRates = require("../Models/CBMRate")


function Rates(socket,io){
socket.on("add_rate", async(data,callback)=>{
   console.log(data)
   try{
      const newRate = new getRates({Sea_freight: 230,Air_freight:18,RMB_rate:0.435})
      await newRate.save()
      callback({status:"ok",message:"Rate added successfully"})
    }catch(error){
        console.log("Error adding rates", error)
        callback({status:"error",message:"Error adding rates"})
    }
    })


  socket.on("getRates", async(data,callback)=>{
    console.log(data);
    try{
      const rates = await getRates.find({})
      callback({status:"ok", data: rates})
    }catch(error){
        console.log(error)
        callback({status:"error",message:"Error fetching rates"})
    }
  })


  
  
  
   socket.on("disconnect",()=>{
      console.log("user disconnected from default namespace")

   })

    return socket
}


module.exports= Rates

const order = require("../Models/Order")
const fs = require("fs");
const path = require("path");

const Tracking=(socket,trackigNamespace,users)=>{

   socket.on("track",async(data,callback)=>{
   console.log(data)
    try{
      console.log(data)
      const Order = await order.find({ items: { $elemMatch: { trackingNo: data } } });
      if(Order.length===0){
         callback({status: "error", message:"Your tracking id is not associated with any order"})
      }
      console.log(Order)
      callback({status: "ok",message:"Tracking"})
      socket.emit("get_item_location",{route: Order[0].route,country: Order[0].selected_country})
      
    }catch(error){
        console.log(error)
    }
   })
   
   


   
   socket.on("disconnect",()=>{
    const userId = Object.keys(users).find((id) => users[id] === socket.id);

    // Remove the user from the `users` object if found
    if (userId) {
      delete users[userId];
      console.log(`User with ID ${userId} disconnected and was removed`);
    }
   })


   
return socket
   

}

module.exports= Tracking
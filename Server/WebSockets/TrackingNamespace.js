
const order = require("../Models/Order")


const Tracking=(socket,trackigNamespace,users)=>{

   socket.on("track",async(data,callback)=>{

    try{
      console.log(data)
      const Order = await order.find({ items: { $elemMatch: { trackingNo: data } } });
      if(!Order){
         callback({success: false, message:"Your tracking id is not associated with any order"})
      }
      socket.emit("get_item_location",{route: Order.route,country: Order.select_country})
      
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
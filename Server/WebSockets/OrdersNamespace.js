 const Order= require("../Models/Order")
 const User= require("../Models/UsersSchema")
 const moment = require('moment');
 

const orderFunc=(socket,adminNamespace,users)=>{
    

    socket.on("submitOrder", (data, callback) => {
        console.log("Received shipment data:", data);
        
        // Save to database (Example with MongoDB)
        data.date = moment(data.date, 'DD-MM-YY').toDate(); // Convert to Date object
        new Order(data)
            .save()
            .then(() => callback({ status: "ok" }))
            .catch((err) =>{
                 callback({ status: "error", message: err.message })
                   console.log(err)
                 }
                 );

      });

    socket.on("allOrders",async(id)=>{
        try{
            //find all Orders with this particular customer's id
             const orders= await Order.find({user_id:id}) 
            
             socket.emit("getOrders",orders) // sending orders of all user to myself
        }catch(error){
          console.log(error)
        }
  })

  socket.on("deleteOrder",async(data)=>{ // deleting order
    try{
        console.log(data)
       await Order.findByIdAndDelete(data.order_id)  // find the order by the id and delele it
       socket.emit("orderDeleted",data.order_id)
       adminNamespace.in("AdminRoom").emit("orderDeleted", order); // Emit to all in "/order" room

       // Check if the users object and the specific customer_id exist
        
        // Emit the event to the specific user
        
    
    }catch(error){
        console.log(error)
    }
})
  
    // Log the users currently in the /order room for debugging
    
    socket.on('disconnect', () => {
        console.log('User disconnected from the tracking namespace');
        const userId = Object.keys(users).find((id) => users[id] === socket.id);

        // Remove the user from the `users` object if found
        if (userId) {
          delete users[userId];
          console.log(`User with ID ${userId} disconnected and was removed`);
        }
    });

    return socket  //return Socket where ever the tracking function is called
}
  

module.exports= orderFunc
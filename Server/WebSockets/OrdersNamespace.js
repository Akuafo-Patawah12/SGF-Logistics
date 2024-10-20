 const Order= require("../DatabaseModels/Order")
 const User= require("../DatabaseModels/UsersSchema")

const orderFunc=(socket,adminNamespace,users)=>{
    

    socket.on("createOrder", async(data) => { //receiving createOrders data from clientside
        console.log(data)
     
        try {
            //Inserting new data received from clientside in to orders table

            const order = new Order({customer_id:data.Id, items:data.items,origin:data.origin, destination:data.destination,tracking_id: data.tracking_id,totalAmount: data.length });// creating new order

            await order.save();  // saving new order the database
            const user= await User.findById(data.Id) //select _id from the Users table where _id=data.id

             const sendOrder = {
                _id: order._id,
                tracking_id: order.tracking_id,
                customer_id: order.customer_id,
                customerName:user.username,
                Status: order.Status, 
            };
            
            
            socket.emit("receive",sendOrder) //send this data the user connected to this namespace
            adminNamespace.in("AdminRoom").emit("receivedOrder", sendOrder); // Emit to all in "/order" room
            
        }catch(err) {
            console.error("Error saving order or emitting event:", err);
        }
});

    socket.on("allOrders",async(id)=>{
        try{
            //find all Orders with this particular customer's id
             const orders= await Order.find({customer_id:id}) 
            
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
       adminNamespace.in("AdminRoom").emit("orderDeleted", sendOrder); // Emit to all in "/order" room

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
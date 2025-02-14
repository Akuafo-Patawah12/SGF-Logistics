const Order= require("../Models/Order")
const User= require("../Models/UsersSchema")


const  AdminPath=(Socket,OrdersNamespace,users)=>{
     
    console.log("connected to orderList")
    Socket.on("joinRoom",(info)=>{
         console.log(info)
         console.log(Socket.rooms)
           Socket.join("AdminRoom")  //When client joins orderlist namespace he/she automatically joins the room
           Socket.emit("joined","hello i joind order room")  /*sending message to all users in the room */
           
    })


    Socket.on("getUsers", async () => {
      const users = await User.find({},"-password -verification_code -device_info -code_expires_at");
      Socket.emit("userList", users);
    });
  
    // Handle user deletion
    Socket.on("deleteUser", async (userId,callback) => {
      try {
        await User.findByIdAndDelete(userId);
        Socket.emit("userDeleted", userId); // Notify all clients
        callback({status: "ok",message:"User deleted successfully!"})
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    });


    Socket.on("clientOrders",async(id)=>{
          try{
               
               const orders = await Order.aggregate([  //joining an querying different tables
                { 
                  $lookup: {
                    from: 'users', // Name of the user collection
                    localField: 'customer_id', // Field in the posts collection
                    foreignField: '_id', // Field in the users collection
                    as: 'userDetails' // Alias for the joined documents
                   }
                },
                {
                  $unwind: '$userDetails' // Deconstruct the array of userDetails
                },
                {
                    $project: {
                      _id: 1, // Include the _id of the post
                      customer_id:1,
                      Status:1,
                      createdAt: 1, //Include the createdAt
                      customerName: '$userDetails.username' // Include the username from userDetails
                    }
                  }
                ]).sort({createdAt:-1});
               Socket.emit("getAllOrders",orders)  //emitting orders to the user that created the order
          }catch(error){
            console.log("Client order's error", error)
          }
    })
    Socket.on("deleteOrder",async(data)=>{
        try{
            console.log(data)
           await Order.findByIdAndDelete(data.order_id)  // find the order by the id and delele it
           Socket.emit("orderDeleted",data.order_id)
           // Check if the users object and the specific customer_id exist
        if (users ) {
            console.log("Customer's socket ID: ", users[data.customer_id]);

            // Emit the event to the specific user
            OrdersNamespace.in(users[data.customer_id]).emit("Deleted", data.order_id);
            
        } else {
            console.log(`No socket found for customer ID: ${data.customer_id} and ${users}`);
        }
        }catch(error){
            console.log(error)
        }
    })

    
    
    Socket.on('disconnect', () => {  
     console.log('User disconnected from the tracking namespace');
     const userId = Object.keys(users).find((id) => users[id] === Socket.id);

     // Remove the user from the `users` object if found
     if (userId) {
       delete users[userId];
       console.log(`User with ID ${userId} disconnected and was removed`);
     }
 });

 return Socket;
}

module.exports= AdminPath
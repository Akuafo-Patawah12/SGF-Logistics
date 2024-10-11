const Order= require("../DatabaseModels/Order")


const  AdminPath=(Socket,orderNamespace,Users)=>{
     
    console.log("connected to orderList")
    Socket.on("joinRoom",async(info)=>{
        
           Socket.join("Admin'sRoom")  //When client joins orderlist namespace he/she automatically joins the room
           Socket.to("Admin'sRoom").emit("joined","hello i joind order room")  /*sending message to all users in the room */
         
    })
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
           orderNamespace.emit("orderDeleted",data.order_id)
           // Check if the users object and the specific customer_id exist
        if (Users ) {
            console.log("Customer's socket ID: ", Users[data.customer_id]);

            // Emit the event to the specific user
            OrderNamespace.to(Users[data.customer_id]).emit("Deleted", data.order_id);
        } else {
            console.log(`No socket found for customer ID: ${data.customer_id} and ${Users}`);
        }
        }catch(error){
            console.log(error)
        }
    })

    Socket.on("getUserOrder",async(data)=>{
        try{
            const orders=await Order.find({customer_id:data})
           Socket.emit("sendUserOrder",orders)
        }catch(error){
            console.log(error)
        }
    })
    
    Socket.on('disconnect', () => {  
     console.log('User disconnected from the tracking namespace');
 });

 return Socket;
}

module.exports= AdminPath
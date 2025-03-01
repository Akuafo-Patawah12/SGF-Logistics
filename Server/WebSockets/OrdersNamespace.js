 const Order= require("../Models/Order")
 const User= require("../Models/UsersSchema")
 const Container= require("../Models/Container")
 const moment = require('moment');
 const mongoose = require("mongoose");
 

const orderFunc=(socket,io,adminNamespace,users)=>{
    
  socket.on("joinRoom", (roomName) => {
    if (roomName) {
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined room: ${roomName}`);
    } else {
      console.log("Room name is required to join a room.");
    }
  });


  socket.on("createOrder", async (data, callback) => {
    console.log("hello", data);
  
    try {
      // Find user by email
      const findUser = await User.findOne({ email: data.email });
      if (!findUser) {
        return callback({ status: "error", message: "User not found" });
      }
  
      // Create order instance
      const order = new Order({
        userId: findUser._id,
        fullname: data.fullname,
        email: data.email,
        items: data.items,
      });
  
      // Save order first before referencing its _id
      await order.save();
  
      // Check if container_id is provided
      if (!data.container_id) {
        return callback({ status: "error", message: "Container ID is required" });
      }
  
      // Find and update container with the new order
      const add_user_to_container = await Container.findOneAndUpdate(
        { _id: data.container_id },
        {
          $push: {
            assignedOrders: {
              orderId: new mongoose.Types.ObjectId(order._id),
              userId: new mongoose.Types.ObjectId(findUser._id),
            },
          },
        },
        { new: true } // Return updated document
      );
  
      // Check if container was found
      if (!add_user_to_container) {
        return callback({ status: "error", message: "Container not found" });
      }

      if (isNaN(data.items[0].cbm) || isNaN(add_user_to_container.cbmRate)) {
        return callback({ status: "error", message: "Invalid CBM or CBM Rate" });
      }
  
      // Ensure cbmRate exists before doing calculations
      if (order.items?.[0] && add_user_to_container.cbmRate) {
        order.items[0].amount = parseInt(data.items[0].cbm) * add_user_to_container.cbmRate;
      }
  
      // Assign additional container data to the order
      order.route = add_user_to_container.route;
      order.selected_country = add_user_to_container.port;
      order.status = add_user_to_container.status;
  
      // Save updated order
      await order.save();
  
      // Send order to client if the user is online
      if (users[order.userId]) {
        socket.to(users[order.userId]).emit("sent_to_client", order);
      }
  
      // Notify AdminRoom about the new assignment
      socket.to("AdminRoom").emit("new", [add_user_to_container]);
      socket.emit("new", [add_user_to_container]);
  
      // Send success response
      callback({ status: "ok", message: "Order created successfully", data: order });
    } catch (error) {
      console.error("Error creating shipment:", error);
      callback({ status: "error", message: error.message });
    }
  });
  
  
  socket.on("editOrderStatus", async (data, callback) => {
    console.log("this data", data)
    try {
      const container = await Container.findById(data.containerId);
  
      if (!container) {
        return callback({ status: "error", message: "Order not found" });
      }
  
      container.status = data.shipmentStatus;
      container.route = data.selectedRoute;
      container.port = data.selectedCountry;
      await container.save();

      const userOrdersMap = {}; // Store updated orders per user

      for (const assigned of container.assignedOrders) {
          const singleOrder = await Order.findById(assigned.orderId);
          
          if (singleOrder) {
              singleOrder.status = container.status;
              singleOrder.selected_country = container.port;
              singleOrder.route = container.route;
              await singleOrder.save();
      
              // Store orders per user to send a single update later
              if (!userOrdersMap[singleOrder.userId]) {
                  userOrdersMap[singleOrder.userId] = [];
              }
              userOrdersMap[singleOrder.userId].push(singleOrder);
          }
      }
      
      // Emit only once per user
      for (const userId in userOrdersMap) {
          if (users[userId]) {
              socket.to(users[userId]).emit("updatedShipment", userOrdersMap[userId]);
          } else {
              console.log(`User ${userId} is offline`);
          }
      }
      
    
  
      callback({ status: "ok", message: "Order status updated successfully", data: [container] });
      socket.to("AdminRoom").emit("updatedShipment", [container])
    } catch (error) {
      console.error("Error updating order status:", error);
      callback({ status: "error", message: error.message });
    }
  })


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

      socket.on("getOrdersByUser", async (data,callback) => {
        const userId= socket.user.id
        
        try {
          const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // Fetch orders by user ID
          console.log(orders)
          socket.emit("ordersByUser", orders); // Send the orders back to the client
        } catch (error) {
          callback( {status:"error" ,message: "Failed to fetch orders", error });
        }
      });


      socket.on("cancelOrder", async (orderId,callback) => {
        try {
          const order = await Order.findById(orderId);
      
          if (!order) {
            callback({status:"error",message:"Order doesn't exist"})
            return;
          }
      
          if (order.status !== "Pending...") {
            callback({status:"error",message:"Cannot delete order"})
            return;
          }
      
          order.status = "Cancelled";
          await order.save();
          callback({status:"ok",message:"Order cancelled"})
          console.log("Order cancelled successfully:", order);
        } catch (error) {
          console.error("Error updating order status:", error);
          callback({status:"error",message:"Error updating order status"})
        }
      
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
        console.log('User disconnected from the order namespace');
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
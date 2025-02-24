const Shipment= require("../Models/Order")

const Container= require("../Models/Container")
const mongoose = require("mongoose")

const Shipping=(socket,ordersNamespace,users)=>{

socket.on("update_Shipments",async(data,callback)=>{
try {
    const { 
      containerNumber,
      selectedShipments
    } = data;

    console.log(containerNumber,
      selectedShipments)
    

    if (!containerNumber ) {
      return callback({status:"error", message: "All fields are required" });
    }

     const update = await Container.findOne({containerNumber:containerNumber})
     
     
     if(!update){
         callback({status:"error", message:"Container does not exist"})
         return
     }
     const updated= await Container.findOneAndUpdate(
      { containerNumber: update.containerNumber },
      { $set: { assignedOrders: selectedShipments.map(s => ({
          orderId: new mongoose.Types.ObjectId(s.orderId),
          userId: new mongoose.Types.ObjectId(s.userId),
        }))
      } },
      { new: true } // Return the updated document
    );
console.log(updated)
    
selectedShipments.forEach((selectedShipment) => {
  const socketId = users[selectedShipment.userId];
  if (socketId) {
    ordersNamespace.to(socketId).emit("assign_to_container", "hello world");
  } else {
    console.error(`User ${selectedShipment.userId} is not connected.`);
  }
});
        
    
    
    callback({status: "ok", message: "Shipments updated successfully" });
    socket.emit("updated_shipment",data)
  } catch (error) {
    console.log("shipment update error",error)
    callback({ message: "Internal server error" });
  }
});



socket.on("fetchAssignedOrderIds", async (assignedOrderIds, callback) => {
  console.log(assignedOrderIds)
  try {
    // Ensure assignedOrderIds is an array and not empty
    if (!Array.isArray(assignedOrderIds) || assignedOrderIds.length === 0) {
      return callback({ status: "error", message: "No assigned orders found." });
    }

    // Find all orders matching the IDs in assignedOrderIds
    const orders = await Shipment.find({ _id: { $in: assignedOrderIds } }).populate("userId", "username email ");
     console.log(orders)
    if (!orders.length) {
      return callback({ status: "error", message: "No orders found." });
    }

    
    socket.emit("fetchAssignedOrders" , orders)
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    callback({ status: "error", message: "Server error. Please try again." });
  }
});




socket.on("deleteShipments", async (data,callback) => {
    console.log("Deleting shipments:", data);

    const { shipmentIds } = data;

    try {
      await Shipment.deleteMany({ _id: { $in: shipmentIds } });
      callback({status: "ok",message:`${shipmentIds.length}, shipments deleted`});

      // Notify all clients about the deletion
      socket.emit("shipmentsDeleted", { shipmentIds });
    } catch (error) {
      console.error("Error deleting shipments:", error);
    }
  });



  socket.on("assign_container", async(data,callback)=>{
    try {
      const { containerName, containerNumber, assignedOrders } = data;

      console.log(assignedOrders)
      let container = await Container.findOne({ containerNumber });

      
  
      if (!container) {
        container = new Container({ containerName, containerNumber, assignedOrders });
      } else {
        container.assignedOrders.push(...assignedOrders);
      }
  
    const saved=  await container.save();
    console.log(saved)
      
      // Emit update
      callback({status:"ok",message:"Users asigned to container"})
      socket.emit("containerUpdated", container);
      
    } catch (error) {
      console.log(error)
      callback({status:"error", error: "Error assigning container" });
    }
  
  })


 


  socket.on("createContainer", async (data, callback) => {
    try {
      const { containerName, containerNumber, status, port, route, eta, cbmRate } = data;
      console.log({ containerName, containerNumber, status, port, route, eta, cbmRate });
  
      if (!containerName || !containerNumber) {
        return callback({ status: "error", message: "All fields are required." });
      }
  
      // Corrected check: Use findOne() instead of find()
      const existingContainer = await Container.findOne({ containerNumber });
  
      if (existingContainer) {
        return callback({ status: "error", message: "Container number is already in use" });
      }
  
      const newContainer = new Container({
        containerName,
        containerNumber,
        status,
        port,
        route,
        cbmRate,
        eta,
      });
  
      await newContainer.save();
  
      // Acknowledge success to the sender
      callback({ status: "ok", message: "Container added" });
  
      // Emit event to all connected users
      socket.emit("newContainerAdded", newContainer);
  
    } catch (error) {
      console.error("Error creating container:", error);
      callback({ status: "error", message: "Failed to create container." });
    }
  });


  socket.on("fetchContainers", async (callback) => {
    try {
      const containers = await Container.find({})
        
      callback({ status: "ok", containers });
    } catch (error) {
      console.error("Error fetching containers:", error);
      callback({ status: "error", message: "Failed to fetch containers" });
    }
  });
  

  socket.on("assignUsersToContainer", async ({ containerId, orders, },callback) => {
    console.log(containerId,orders)
    try {
      // Find the container by ID
      const container = await Container.findById({containerNumber:containerId});
      if (!container) {
        return callback( {status:"error", message: "Container not found" });
      }

      // Add orders (with user IDs) to the assignedOrders array
      orders.forEach((order) => {
        container.assignedOrders.push({
          orderId: order.orderId,
          userId: order.userId,
        });
      });

      // Save the updated container
      await container.save();

      for (const update of orders) {

        await Shipment.updateOne(
          { _id: update.orderId},
          {
            $set: {
              "items.$.port": update.port,
              "items.$.status": update.status,
            },
          }
        );
      }

      // Notify the assigned users
      orders.forEach((order) => {
        const recipientSocketId = users[order.userId]; // Fetch user’s socket ID
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("assignedToContainer", { containerId, orders });
        }
      });
      

      callback({status:"ok",message:"Users asigned to container"})
      // Emit update to admin
      socket.emit("usersAssigned", { message: "Users successfully assigned!", container });
    } catch (error) {
      console.log(error)
      callback({status:"error", message: "Error assigning users."});
    }
  });


socket.on("get_orders",async(data,callback)=>{
    
    
    try {
        const orders = await Shipment.find({});
        
        
        socket.emit("all_orders",orders)
    } catch (error) {
        console.error("Error creating shipment", error);
        callback({ status: "error", message: "failed to load shippments" })
    }
})



socket.on("disconnect",()=>{
  console.log("disconnected from shipment namespace")
  const userId = Object.keys(users).find((id) => users[id] === socket.id);

  // Remove the user from the `users` object if found
  if (userId) {
    delete users[userId];
    console.log(`User with ID ${userId} disconnected and was removed`);
  }
})

  return socket;
}

module.exports= Shipping
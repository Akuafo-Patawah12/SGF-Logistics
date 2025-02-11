const Shipment= require("../Models/Order")

const Shipping=(socket,shipmentNamespace,users)=>{

socket.on("update_Shipments",async(data,callback)=>{
try {
    const { shipments,route, selected_country, status } = data;
    

    if (!shipments || !route || !selected_country || !status) {
      return callback({status:"error", message: "All fields are required" });
    }

     const update = await Shipment.updateMany(
      { _id: { $in: shipments } },
      { $set: { route, selected_country, status } }
    );
    console.log("This is our new update",update)
    callback({status: "ok", message: "Shipments updated successfully" });
    socket.emit("updated_shipment",data)
  } catch (error) {
    console.log("shipment update error",error)
    callback({ message: "Internal server error" });
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

socket.on("get_orders",async(data,callback)=>{
    
    
    try {
        const orders = await Shipment.find({});
        
        console.log("Shipment created successfully", orders);
        socket.emit("all_orders",orders)
    } catch (error) {
        console.error("Error creating shipment", error);
        callback({ status: "error", message: error.message })
    }
})



socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  return socket;
}

module.exports= Shipping
const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema({
  containerName: { type: String, required: true },  
  containerNumber: { type: Number, required: true, unique: true },
  loadingDate: { type: Date },  // Date when the shipment is loaded
  eta: { type: Date, required: true },
  status:{type:String, enum:["Pending...","In Transit","Delivered","Cancelled"],default:"Pending..."},
  route: { type: String, required: true },     // Route description (e.g., "Shanghai -> New York")
  port: { type: String, required: true },      // Port of destination
  cbmRate: { type: Number, required: true },   // Cost per CBM (Cubic Meter)
  assignedOrders: [
    {
      orderId: { type: mongoose.Types.ObjectId, ref: "order" },
      userId: { type: mongoose.Types.ObjectId, ref: "user"},
    }
  ],
}, { timestamps: true });


const container = mongoose.model("container", ContainerSchema);
module.exports = container


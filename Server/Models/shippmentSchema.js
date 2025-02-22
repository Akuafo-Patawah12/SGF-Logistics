const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  containerName: { type: String, required: true },  // Name of the container
  containerNumber: { type: Number, required: true }, // Unique container number
  loadingDate: { type: Date, required: true },  // Date when the shipment is loaded
  eta: { type: Date, required: true },         // Estimated time of arrival
  status: { 
    type: String, 
    enum: ["pending", "shipped", "delivered"], 
    default: "pending",
    required: true 
  },  // Current shipment status
  
}, { timestamps: true });

module.exports = mongoose.model("Shipment", ShipmentSchema);

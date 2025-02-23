
const Order = require("../Models/Order"); // Assuming your Order model is in models/Order.js
const Container = require("../Models/Container"); // Assuming your Container model is in models/Container.js



const addCBM= async (req, res) => {
  try {
    const { cbm, selectedOrder } = req.body;

    if (!cbm || !selectedOrder) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    // Find the order by ID
    const order = await Order.findById(selectedOrder);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    // Find the container that has this order assigned
    const container = await Container.findOne({ "assignedOrders.orderId": selectedOrder });

    if (!container) {
      return res.status(404).json({ status: "error", message: "Container not found for this order" });
    }

    // Get the cbmRate from the container
    const cbmRate = container.cbmRate;
    if (!cbmRate) {
      return res.status(400).json({ status: "error", message: "CBM Rate not found in container" });
    }

    // Calculate the amount
    const amount = cbm * cbmRate;

    // Update the order with CBM and calculated amount
    order.items[0].cbm = parseInt(cbm);
    order.items[0].amount = amount;
    order.route= container.route
    await order.save();
    const newData= { newCBM:cbm,selectedOrder: selectedOrder}
    res.status(200).json({ status: "success", message: "Order updated successfully", newData});
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
}

module.exports = addCBM;

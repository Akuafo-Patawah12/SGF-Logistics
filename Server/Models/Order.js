const mongoose = require("mongoose");



const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  trackingNo: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  items: { type: [ItemSchema], required: true },
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  special_handling: { type: String, default: "" },
  origin: { type: String, default: "" },
  route:{type:String,default:""},
  selected_country:{type:String,default:""},
  status:{type:String,enum:["Pending...","In Transit","Delivered","Cancelled"],default:"Pending..."},
  destination: { type: String, default: "" },
},{ timestamps: true });




const order = mongoose.model("order", OrderSchema);
module.exports = order;
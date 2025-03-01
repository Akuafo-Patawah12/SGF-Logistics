const mongoose = require("mongoose");



const ItemSchema = new mongoose.Schema({
  description: { type: String,default:"Unclassified"},
  trackingNo: { type: String, required: true },
  cbm:{type:Number},
  ctn:{type:Number},
  amount:{type:Number,default:0},
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  items: { type: [ItemSchema], required: true },
  fullname: { type: String, required: true },
  
  email: { type: String, required: true },
  route:{type:String,default:""},
  selected_country:{type:String,default:""},
  container_number:{type:String, default:""},
  status:{type:String,enum:["Pending...","In Transit","Delivered","Cancelled"],default:"Pending..."},

},{ timestamps: true });




const order = mongoose.model("order", OrderSchema);
module.exports = order;
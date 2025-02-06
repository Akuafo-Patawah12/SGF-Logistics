const mongoose= require("mongoose")

const {Schema} = mongoose

const orderSchema= Schema({
 user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shippingMark: { type: String, required: true },
  trackingNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  telephoneNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  typesOfGoods: { type: [String], required: true }, // Array of selected goods
  shippingOrigin: { type: String, required: true, enum: ["Guangzhou", "Yiwu"] },
  additionalDetails: { type: String },
}, { timestamps: true });


const order= mongoose.model("order", orderSchema)

module.exports= order
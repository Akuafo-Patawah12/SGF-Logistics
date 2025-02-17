const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    trackingNo: { type: String, required: true },
    ctnNo: { type: String, required: true },
    cbm: { type: String, required: true },
    Amount: { type: String, required: true },
    length: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"user"},
    items: { type: [ItemSchema], required: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    additional_info: { type: String, default: "" },
    special_handling: { type: String, default: "" },
    route: {type: String, default:""},
    selected_country: {type:String,default: ""},
    shipment_type: { type: String, default: "" },
    status: {type:String,default:"Pending..."},
    origin: { type: String, default: "" },
    destination: { type: String, default: "" },
    
}, { timestamps: true });

const order = mongoose.model("order", orderSchema);
module.exports = order;
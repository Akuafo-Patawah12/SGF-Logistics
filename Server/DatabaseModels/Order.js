const mongoose= require("mongoose")

const {Schema} = mongoose

const orderSchema= Schema({

    fullname:String,
    email:String,
    phone: Number,
    shipment_type:String,
    special_handling:String,


    tracking_id: String,
        items: [
          {
            itemName: String,
            quantity: Number,
            weight:String
          }
        ],
        totalAmount: Number,
        shipmentId: {type:Schema.Types.ObjectId, ref:"Shipment"},
        origin: String,
          
        destination:String,
        additional_info:String,
            
      
    Status:{
       type:String,
        enum: ["Pending...","in-Transit","Delivered"],
        default:"Pending..."
    }
    ,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updateAt:Date
})

const order= mongoose.model("order", orderSchema)

module.exports= order
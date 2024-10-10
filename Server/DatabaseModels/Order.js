const mongoose= require("mongoose")

const {Schema} = mongoose

const orderSchema= Schema({

    customer_id: {type:Schema.Types.ObjectId,ref:"User"},  

    tracking_id: String,
        items: [
          {
            itemName: String,
            quantity: Number,
          }
        ],
        totalAmount: Number,
        shipmentId: {type:Schema.Types.ObjectId, ref:"Shipment"},
        origin: String,
          
        destination:String,
            
      
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
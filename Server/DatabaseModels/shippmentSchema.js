const mongoose= require("mongoose")

const {Schema} = mongoose

const shippmentSchema= Schema({
    
    order_id:{type:Schema.Types.ObjectId, ref:"order"},
    tracking_id:String,

    status:String,

    created_At:{
        type:Date,
        default: Date.now()
    },
    updated_At:{
        type:Date
    }

})

const shippent= mongoose.model('shipment',shippmentSchema )
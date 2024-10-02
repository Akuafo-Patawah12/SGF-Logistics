const mongoose= require("mongoose")

const {Schema} = mongoose

const orderSchema= Schema({

    items:[
        {
            name:String,
            quantity:Number
        }
    ],
    status:String,

    origin:[
        {
            city:String,
            street_name:String
        }
    ],
    destination:[
        {
            city:String,
            street_name:String
        }
    ],
    created_At:{
        type:Date,
        default: Date.now()
    }
})

const order= mongoose.model("order", orderSchema)

module.exports= order
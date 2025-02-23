const mongoose= require("mongoose")
const Order = require("./Order")

const {Schema} = mongoose

let userSchema= Schema({

    username:String,

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    
    password:{
        type:String,
        require:true
    },
    account_type:{
        type:String,
        enum:["Admin","User"]
    },
    device_info: {
      type: [String] // To specify that it's an array of strings
    },
    verification_code:{type:Number,default:null},
    code_expires_at:{type:Date,default:null},
    created_At:{
        type:Date,
        default: Date.now()
    },
    updated_At:{
        type:Date
    }
})

userSchema.pre("findOneAndDelete", async function (next) {
    const user = await this.model.findOne(this.getFilter()); // Get the user being deleted
    if (user) {
      await Order.deleteMany({ userId: user._id }); // Delete all orders related to the user
    }
    next();
  });

const users= mongoose.model("user",userSchema)

module.exports= users
const mongoose= require("mongoose")

const {Schema} = mongoose

const userSchema= Schema({

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
    created_At:{
        type:Date,
        default: Date.now()
    },
    updated_At:{
        type:Date
    }
})

const users= mongoose.model("user",userSchema)

module.exports= users
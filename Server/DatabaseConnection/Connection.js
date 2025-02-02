const mongoose= require("mongoose");
require("dotenv").config()

const DB_connection=()=>{
    return mongoose.connect(process.env.mongoURI)  //Database connection
}

module.exports= DB_connection
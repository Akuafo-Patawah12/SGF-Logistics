const mongoose= require("mongoose");
require("dotenv").config()

const DB_connection=()=>{
    return mongoose.connect(process.env.DB_url)  //Database connection
}

module.exports= DB_connection
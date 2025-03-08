const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  Sea_freight:{type:Number, default:0.02},
  Air_freight:{type:Number, default:0.02},
  RMB_rate:{type:Number, default:0.02},
});

const ItemsModel = mongoose.model("Rate_info", ItemSchema)

module.exports= ItemsModel
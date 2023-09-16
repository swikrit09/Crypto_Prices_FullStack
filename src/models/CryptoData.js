const mongoose=require("mongoose");

const CrptoData= new mongoose.Schema({
    index:Number,
    name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String,
  });

  const Crypto= new mongoose.model("cryptoData",CrptoData)
  module.exports= Crypto;
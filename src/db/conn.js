const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/CryptoData",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`connection succesful`);
}).catch((e)=>{
    console.log("no connection");
})
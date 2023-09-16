const path = require("path")
const hbs = require("hbs")
const express = require("express")
const exp = require("constants")
const app = express()
const port = process.env.PORT || 8000
require("./db/conn");
const Crypto = require("./models/CryptoData")
const axios = require("axios")
const Api_url = "https://api.wazirx.com/api/v2/tickers"


// register static path
const static_path = path.join("public")
app.use(express.static(static_path));

// register templates 
// console.log(path)
const template_path = path.join("templates/views")

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "hbs");
app.set("views", template_path);

const getDataAndStore = async () => {
    try {

        const response = await axios.get(Api_url)
        // console.log(response.data.btcinr)

        // Clear existing data in the MongoDB collection
        await Crypto.deleteMany();

        const dataEntries = Object.values(response.data);
        const FinalData = dataEntries.slice(0, 10);
        // console.log(FinalData)    
        FinalData.forEach(async (data, id) => {
            const cryptoData = new Crypto({
                index: id + 1,
                name: data.name,
                last: data.last,
                buy: data.buy,
                sell: data.sell,
                volume: data.volume,
                base_unit: data.base_unit,
            })
            await cryptoData.save();
            // console.log('Data saved to MongoDB:', cryptoData);
        })
    } catch (e) {
        console.log(e)
    }
}

getDataAndStore()


app.get("/", async(req, res) => {
    try{
    // fetching Cryptodata from db
    const data= await Crypto.find()
    const sortedData=data.sort()

    res.status(201).render("index",{data})
    }catch(e){
        res.status(500).send(e)
    }

})
// app.get("/data",(req,res)=>{
//     // res.send("hello")
//     res.send(index)
// })

app.listen(port, () => {
    console.log((`the site is running at ${port}`))
})
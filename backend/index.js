const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const userRoute = require("./Routes/users.js")
const emotRoute = require("./Routes/emots.js")

dotenv.config();

app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('activ cuuk')
};

app.use("/api/users", userRoute);
app.use("/api/emots", emotRoute);

app.listen(8080, () =>{
    console.log('im running heeeereeeeeee coy')
})

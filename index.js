const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require("./middlewares/errorHandler")

const app = express()
require("dotenv").config();
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb"}))
app.use(cors({ origin: "*" }))
app.use("/users", userRoutes)
app.use(errorHandler)


const port = 5353
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})

const uri = process.env.MONGO_URI

const connect = async () => {
    mongoose.set("strictQuery", false)
    await mongoose.connect(uri)
    console.log("MongoDB is connected");
}

connect()
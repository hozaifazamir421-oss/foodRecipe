const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require("./config/connectionDb")
const cors = require("cors")
const PORT = process.env.PORT || 3000
app.use(express.json())
connectDb()
app.use(cors())
app.use(express.static("public"))

app.use('/recipe',require("./routers/recipe"))
app.use('/',require("./routers/userRoute"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on ${PORT}`)
})
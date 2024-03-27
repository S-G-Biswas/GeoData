const express = require("express");
require("dotenv").config()
const {connection} =require("./config/db")
const {userRouter} = require("./routes/user.routes")
const cors=require("cors");
const { dataRouter } = require("./routes/data.routes");
const app = express();
app.use(express.json());
app.use(cors())


app.use("/users",userRouter)
app.use("/data",dataRouter)


///Server connection

app.listen(process.env.port,async ()=>{
    try {
         await connection
         console.log("connected to DB")
         console.log(`Server is ruuning at port ${process.env.PORT}`);
    } catch (error) {
        console.log(error)
    }
    
})
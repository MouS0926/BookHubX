const express=require("express")
const { connection } = require("./db")
const { bookRouter } = require("./routes/bookRoute")
const { userRoute } = require("./routes/userRoute")
const app=express()

app.use(express.json())

app.use("/books",bookRouter)
app.use("/user",userRoute)

app.get("/",(req,res)=>{
    res.send("get")
})


app.listen(8080,async()=>{

    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})
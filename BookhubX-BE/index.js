const express=require("express")
const { connection } = require("./db")
const { bookRouter } = require("./routes/bookRoute")
const { userRoute } = require("./routes/userRoute")
const { discussionRoute } = require("./routes/discussionRoute")
const { reviewRoute } = require("./routes/reviewRoute")
const { cartRoute } = require("./routes/cartRoute")
const { orderRoute } = require("./routes/orderRoute")
const { readingListRoute } = require("./routes/readlingListRoute")
const cors =require("cors")
// const fetch = require("node-fetch")
// const fetch = require("cross-fetch");


require("dotenv").config()
const { createChat,CancelledCompletionError } = require("completions")


const app=express()
app.use(cors())
app.use(express.json())


app.use("/books",bookRouter)
app.use("/user",userRoute)
app.use("/discussion",discussionRoute)
app.use("/review",reviewRoute)
app.use("/cart",cartRoute)
app.use("/order",orderRoute)
app.use("/readinglist",readingListRoute)

const openAI_key=process.env.OpenAI_Key

app.post("/",async(req,res)=>{


try {
   
      const response = await chat.sendMessage("What is the sum of 6 and 8?");
      console.log(response.content);
      res.send(response)
 
} catch (error) {
    console.log(error);
    res.status(400).send(error)
}

})

 


// const chat = createChat({
//   apiKey: openAI_key,
//   model: "gpt-3.5-turbo-0613",
//   functions: [
//     {
//       name: "sum_of_two_numbers",
//       description: "Calculate the sum of two integers",
//       parameters: {
//         type: "object",
//         properties: {
//           firstNumber: {
//             type: "integer",
//             description: "The first integer",
//           },
//           secondNumber: {
//             type: "integer",
//             description: "The second integer",
//           },
//         },
//         required: ["firstNumber", "secondNumber"],
//       },
//       function: async ({ firstNumber, secondNumber }) => {
//         const sum = firstNumber + secondNumber;
//         return {
//           result: sum,
//         };
//       },
//     },
//   ],
//   functionCall: "auto",
// });



app.listen(8080,async()=>{

    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})
const express=require("express")
const { bookModel } = require("../models/bookModel")
const { auth } = require("../middleware/auth.middleware")


const bookRouter=express.Router()


bookRouter.get("/",async(req,res)=>{
    try {
        let allbooks=await bookModel.find()
        res.status(200).send(allbooks)
    } catch (error) {
        res.status(200).send({"error":error})
    }
})

bookRouter.post("/add",auth,async(req,res)=>{
    //complete
    
})


module.exports={
    bookRouter
}
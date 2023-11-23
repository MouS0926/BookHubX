const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    userId:String,
    username:String,
    bookId :String,
    quantity:Number,
    bookimage:String,
    bookprice:Number
},{
    versionKey:false
})

const cartModel=mongoose.model("cart",cartSchema)
module.exports={
    cartModel
}
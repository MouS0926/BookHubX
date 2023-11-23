const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    title: String,
    author: [{type:String}],
    genre: [{type:String}],
    description: String,
    price: String,
    image: String,
    publisher: String,
    userId:String
},{
    versionKey:false
})

const bookModel=mongoose.model("book",bookSchema)

module.exports={
    bookModel
}
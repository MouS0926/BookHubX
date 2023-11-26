const mongoose=require("mongoose")

const readinglistSchema=mongoose.Schema({
    userId:String,
    username:String,
    bookId:String,
    dateAdded: {
        type: Date,
        default: Date.now,
      },
    
    
},{
    versionKey:false
})

const readinglistModel=mongoose.model("review",readinglistSchema)
module.exports={
    readinglistModel
}
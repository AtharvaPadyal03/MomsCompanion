import mongoose from "mongoose" 

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    url:{
        type:String
    },
    coverimage:{
        type:String,
    }
})

export const Book = mongoose.model("Book",bookSchema)
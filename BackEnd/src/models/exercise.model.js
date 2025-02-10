import mongoose from "mongoose" 

const exerciseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    trimester:{
        type:Number,
        required:true
    },
    repetition:{
        type:Number,
        required:true
    },
    sets:{
        type:Number,
        required:true
    },
    url:{
        type:String
    }
})

export const Exercise = mongoose.model("Exercise",exerciseSchema)
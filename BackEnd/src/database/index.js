import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"


const connnectDB = async ()=>{
    try {   
        console.log(process.env.MONGODB_URL)
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Db is connected on ${connection.connection.host}`)
    } catch (error) {
        console.log("Error while connecting db",error)
        process.exit(1)
    }
}

export default connnectDB
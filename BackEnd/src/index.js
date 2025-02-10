import dotenv from 'dotenv'
import connnectDB from './database/index.js'
import app from './app.js'
dotenv.config({
    path:'./env'
})


 
connnectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`App is currently running on PORT:${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log('Something went wrong while connecting to db',error)
})


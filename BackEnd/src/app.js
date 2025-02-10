import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
//export default upload;
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
})) //<-use for all middle wares


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:'20kb'}))
app.use(express.static("public"))

import userRouter from './routes/user.routes.js'
import bookRouter from './routes/book.routes.js'
import exerciseRouter from './routes/exercise.routes.js'


app.post("/classify", upload.single("img"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: "No image uploaded"});
        }
        console.log("Here");
        // Prepare file for Flask API
        const formData = new FormData();
        formData.append("img",fs.createReadStream(req.file.path));

        // Send request to Flask
        const flaskResponse = await axios.post("http://127.0.0.1:5000/submit",formData, {
            headers: { ...formData.getHeaders() },
        });
        // Remove temp file
        fs.unlinkSync(req.file.path);
        //Send Flask's response back to client
        console.log(flaskResponse.data);
        res.json(flaskResponse.data);
       // res.send(flaskResponse.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
    
app.use('/user',userRouter)
app.use('/book',bookRouter)
app.use('/exercise',exerciseRouter)


export default app
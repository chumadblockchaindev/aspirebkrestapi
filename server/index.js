import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
    origin: ['https://www.aspbk.online', 'http://localhost:5173'],
    credentials: true
}))
app.use(bodyParser.json())

// const PORT = process.env.PORT
// const MONGOURL = process.env.MONGO_URL
const MONGODB_CLOUD_STRING = process.env.MONGODB_CLOUD_STRING

mongoose
        .connect(MONGODB_CLOUD_STRING)
        .then(() => {
            console.log("DB connected successfully.")
            app.listen(5000, ()=> {
                console.log(`Server is running on port: ${5000}`)
            })
        })
        .catch(error => console.error(error))

        app.use("/api", route)
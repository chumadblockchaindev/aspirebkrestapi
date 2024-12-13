import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

// const PORT = process.env.PORT
const MONGOURL = process.env.MONGO_URL
// const MONGODB_CLOUD_STRING = process.env.MONGODB_CLOUD_STRING

mongoose
        .connect(MONGOURL)
        .then(() => {
            console.log("DB connected successfully.")
            app.listen(5000, ()=> {
                console.log(`Server is running on port: ${5000}`)
            })
        })
        .catch(error => console.error(error))

        app.use("/api", route)
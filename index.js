import Courses from "./routes/courses.js"
import Users from "./routes/user.js"
import colors from "colors"
import { connectDB } from "./database/db.js"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"

//this is the main server.js or index.js file from where we are running the backend. we are running the server on localhost 8000 server and also calling the connection function over here.
const PORT = 8000
const app =express()

dotenv.config()
//connecting to the database
connectDB()
app.use(cors());

app.use(express.json());
app.use(morgan('dev'))
app.use(
    express.urlencoded({extended:false})
);
//declaring the routes for courses and users
app.use('/api/v1/courses',Courses)
app.use('/api/v1/users', Users)



app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`.bgWhite)
})
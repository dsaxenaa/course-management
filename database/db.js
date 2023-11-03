import colors from 'colors'
import mongoose from "mongoose";

// we are using MongoDB as the database. we are using MongoDB compass to connect to the mongodb database locally
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect("mongodb://0.0.0.0:27017/course-management")
        console.log(`Connected to the Database ${conn.connection.host}`.bgGreen)

        
    } catch (error) {
        console.log(`Error in MongoDb ${error}`.bgRed)
        
    }
}
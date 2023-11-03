import mongoose from "mongoose"

// Defining the User Schema using mongoose since we are using the MongoDB database 
const User = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
       
})

export default mongoose.model('User', User)
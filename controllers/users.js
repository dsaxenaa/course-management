import {check, validationResult} from "express-validator"

import Jwt from "jsonwebtoken"
import User from "../models/user.js"
import bcrypt from 'bcrypt'

export const register = async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const validations = [ // checking validations for these different parameters
            check('name', 'Name is required').exists(),
            check('name').trim().isAlpha('en-US', { ignore: ' ' }).withMessage('Name should be only alphabets'),
            check('email', 'Invalid email').isEmail(),
            check('password', 'Password is required').exists(),
          ];
          validations.forEach((validation) => validation.run(req));
          const errors = validationResult(req);
          if(errors.isEmpty()){
            const exists = await User.findOne({email}) //checking if user already exists
            if(!exists){
                const salt = await bcrypt.genSalt(10);
                const newPassword = bcrypt.hashSync(password,salt)
                console.log(newPassword)
                try {
                    const user = await new User({
                        name, email, password:newPassword
                    }).save()    // saving the user in the database
                    const JWT_TOKEN = process.env.JWT_TOKEN_SECRET
                    const authorize =Jwt.sign({ userId: user._id, email: user.email },JWT_TOKEN)
                    return res.status(200).json({message:"User successfully registered", user, authorize})  // returning the response after registration
                } catch (error) {
                    return res.status(500).json({message:"Something went wrong!"})
                    // console.log(error)
                }
                
            }
            return res.status(409).json({message:"Email already exists!"})
            
          }
          return res.status(500).json({message:"Validation error or missing field!"})
        
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const validations = [    //validation check
            check('email', 'Invalid email').isEmail(),
            check('password', 'Password is required').exists(),
          ];
          validations.forEach((validation) => validation.run(req));
          const errors = validationResult(req);
          if(errors.isEmpty()){
            const user = await User.findOne({email})
            if(user){
                const verify = await bcrypt.compare(password,user.password)   //checking the password
                if(verify){
                    const JWT_TOKEN = process.env.JWT_TOKEN_SECRET
                    const token=Jwt.sign({userId: user._id, email: user.email },JWT_TOKEN,{
                        expiresIn:"7d"
                    })
                    return res.status(200).json({message:"Login Successful", user, token:token })   // returning successful response for login
                    
                }
                return res.status(401).json({message:"Wrong Password!"})
            }
            return res.status(404).json({message:"User does not exist!"})
          }
        return res.json({message:"Validation error or missing field!"})
    } catch (error) {
        console.log(error)
    }
}